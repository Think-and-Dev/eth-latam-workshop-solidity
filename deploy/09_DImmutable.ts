import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {printDeploySuccessful, printInfo} from '../utils/utils';

const version = 'v0.0.0';
const ContractName = 'Immutable';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, token} = await getNamedAccounts();

  printInfo(`\n Deploying ${ContractName} contract...`);

  const ImmutableResult = await deploy(ContractName, {
    args: [token],
    contract: ContractName,
    from: deployer,
    skipIfAlreadyDeployed: false,
    autoMine: true,
  });

  const immutableAddress = ImmutableResult.address;

  printDeploySuccessful(ContractName, immutableAddress);
  return true;
};

export default func;
const id = ContractName + version;
func.tags = [id, version];
func.dependencies = ['Constantv0.0.0', 'NoConstantsv0.0.0'];
func.id = id;
