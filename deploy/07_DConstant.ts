import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {printDeploySuccessful, printInfo} from '../utils/utils';

const version = 'v0.0.0';
const ContractName = 'Constant';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  printInfo(`\n Deploying ${ContractName} contract...`);

  const ConstantResult = await deploy(ContractName, {
    args: [],
    contract: ContractName,
    from: deployer,
    skipIfAlreadyDeployed: false,
    autoMine: true,
  });

  const constantAddress = ConstantResult.address;

  printDeploySuccessful(ContractName, constantAddress);

  return true;
};

export default func;
const id = ContractName + version;
func.tags = [id, version];
func.id = id;
