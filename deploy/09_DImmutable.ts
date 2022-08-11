import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const version = 'v0.0.0';
const ContractName = 'Immutable';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, token} = await getNamedAccounts();

  console.log('\n Deploying Immutable contract...');

  const ImmutableResult = await deploy(ContractName, {
    args: [token],
    contract: ContractName,
    from: deployer,
    skipIfAlreadyDeployed: false,
    autoMine: true,
  });

  const immutableAddress = ImmutableResult.address;

  console.log('\n  Contract Deployment Complete!\n');
  console.log('-ContractName                       ', immutableAddress);

  return true;
};

export default func;
const id = ContractName + version;
func.tags = [id, version];
func.dependencies = ['Constantv0.0.0', 'NoConstantsv0.0.0'];
func.id = id;
