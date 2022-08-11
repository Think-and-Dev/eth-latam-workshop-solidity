import {Contract} from 'ethers';
import {ethers} from 'hardhat';
import chalk from 'chalk';
import * as readline from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';

/* ----------- CONFIG START -------------- */

const victimContractName = process.env.VICTIM_CONTRACT_NAME ?? 'ReentrancyVictim';
const generalLogs = chalk.gray;
const warningLogs = chalk.yellow;
const eventsLogs = chalk.blue;
const attackerLogs = chalk.red;
const victimLogs = chalk.green;
const userLogs = chalk.magenta;
const extraPayinAmount = 9; // 9wei
const attackerPayinAmount = 1; // 1wei

/* ----------- CONFIG END -------------- */

let rl: readline.Interface;

async function main() {
  rl = readline.createInterface({input, output});
  const userAddress = (await ethers.getSigners())[0].address;

  console.log(generalLogs(`-----------Deploying reentrancy example (${victimContractName})-----------`));
  const RentrancyVictimContract = await ethers.getContractFactory(victimContractName);
  const RentrancyAttackerContract = await ethers.getContractFactory('ReentrancyAttacker');
  const RentrancyVictimInstance = await RentrancyVictimContract.deploy();

  await RentrancyVictimInstance.deployed();

  console.log(userLogs('Deployer user address:', userAddress));
  console.log(victimLogs('RentrancyVictimInstance deployed to:', RentrancyVictimInstance.address));

  const RentrancyAttackerInstance = await RentrancyAttackerContract.deploy(RentrancyVictimInstance.address, {
    value: attackerPayinAmount,
  });

  console.log(
    attackerLogs(
      'RentrancyAttackerInstance with ' + attackerPayinAmount + ' ETH deployed to:',
      RentrancyAttackerInstance.address
    )
  );

  console.log(generalLogs('-----------Deployed reentrancy example contracts-----------'));

  await printTxToConsole(
    RentrancyVictimInstance.payIn({value: extraPayinAmount}),
    RentrancyVictimInstance,
    RentrancyAttackerInstance
  );

  await printTxToConsole(RentrancyAttackerInstance.payIn(), RentrancyVictimInstance, RentrancyAttackerInstance);

  console.log(
    victimLogs('Victim contract total balance before attack: ', await RentrancyVictimInstance.contractBalance())
  );

  console.log(
    attackerLogs('Attacker contract total balance before attack: ', await RentrancyAttackerInstance.contractBalance())
  );

  rl.question('Proceed with attack? (Y,n)', async (response) => {
    if (response === 'n') {
      rl?.close();
      return;
    }
    console.log(warningLogs('Performing attack'));

    await printTxToConsole(
      RentrancyAttackerInstance.withdrawAttack(),
      RentrancyVictimInstance,
      RentrancyAttackerInstance
    );

    console.log(
      victimLogs('Victim contract total balance after attack: ', await RentrancyVictimInstance.contractBalance())
    );

    console.log(
      attackerLogs('Attacker contract total balance after attack: ', await RentrancyAttackerInstance.contractBalance())
    );
    rl?.close();
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => {})
  .catch((error) => {
    console.error(error);
    rl?.close();
    process.exitCode = 1;
  });

let lastBlockShown = 0;

// Ease the process of showing the events and, in case of failure, rejection errors of the tx to the console
async function printTxToConsole(tx: any, victimContract: Contract, attackerContract: Contract) {
  const receipt = await (await tx).wait().catch((error: any) => {
    console.error('Error on tx', error);
  });
  const events = await victimContract.queryFilter({}, lastBlockShown + 1);
  const userAddress = (await ethers.getSigners())[0].address;
  for (const event of events) {
    let log: string = `   Event ${eventsLogs(event.event)}. `;
    if (event.args) {
      const fromAddress = event.args[0];
      log += `From: ${
        fromAddress === victimContract.address
          ? victimLogs(fromAddress)
          : fromAddress === attackerContract.address
          ? attackerLogs(fromAddress)
          : fromAddress === userAddress
          ? userLogs(fromAddress)
          : generalLogs(fromAddress)
      }. Value: ${event.args[1]}`;
    }
    console.log(log);
  }
  lastBlockShown = receipt.blockNumber;
}
