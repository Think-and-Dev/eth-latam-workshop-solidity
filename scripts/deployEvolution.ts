import {ethers} from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther('1');

  const LockV4 = await ethers.getContractFactory('LockV4');
  const LockV5 = await ethers.getContractFactory('LockV5');
  const LockV6 = await ethers.getContractFactory('LockV6');
  const LockV7 = await ethers.getContractFactory('LockV7');
  const LockV8 = await ethers.getContractFactory('LockV8');

  const lockV4 = await LockV4.deploy(unlockTime, {value: lockedAmount});
  const lockV5 = await LockV5.deploy(unlockTime, {value: lockedAmount});
  const lockV6 = await LockV6.deploy(unlockTime, {value: lockedAmount});
  const lockV7 = await LockV7.deploy(unlockTime, {value: lockedAmount});
  const lockV8 = await LockV8.deploy(unlockTime, {value: lockedAmount});

  await lockV4.deployed();
  await lockV5.deployed();
  await lockV6.deployed();
  await lockV7.deployed();
  await lockV8.deployed();

  console.log('LockV4 with 1 ETH deployed to:', lockV4.address);
  console.log('LockV5 with 1 ETH deployed to:', lockV5.address);
  console.log('LockV6 with 1 ETH deployed to:', lockV6.address);
  console.log('LockV7 with 1 ETH deployed to:', lockV7.address);
  console.log('LockV8 with 1 ETH deployed to:', lockV8.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
