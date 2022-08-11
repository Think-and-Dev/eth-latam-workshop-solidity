import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const version = 'v0.0.0';
const ContractName = 'NoConstants';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, token} = await getNamedAccounts();

  console.log('\n Deploying NoConstants contract...');

  const NoConstantsResult = await deploy(ContractName, {
    args: [token],
    contract: ContractName,
    from: deployer,
    skipIfAlreadyDeployed: false,
    autoMine: true,
  });

  const noConstantsAddress = NoConstantsResult.address;

  console.log('\n  Contract Deployment Complete!\n');
  console.log('-ContractName                       ', noConstantsAddress);

  return true;
};

export default func;
const id = ContractName + version;
func.tags = [id, version];
func.dependencies = ['Constantv0.0.0'];
func.id = id;
