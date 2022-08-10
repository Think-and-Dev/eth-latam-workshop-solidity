import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import {getUnlockTime} from '../utils/utils';

const version = 'v0.0.0';
const ContractName = 'LockV6';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  console.log('\n Deploying LockV6 contract...');
  const unlockTime = getUnlockTime();

  const LockV6Result = await deploy(ContractName, {
    args: [unlockTime],
    contract: ContractName,
    from: deployer,
    skipIfAlreadyDeployed: false,
    value: ethers.utils.parseEther('1'),
    autoMine: true,
  });

  const lockV6Address = LockV6Result.address;

  console.log('\n  Contract Deployment Complete!\n');
  console.log('-ContractName                       ', lockV6Address);

  return true;
};

export default func;
const id = ContractName + version;
func.tags = [id, version];
func.id = id;
