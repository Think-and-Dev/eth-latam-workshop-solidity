import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const version = 'v0.0.0';
const ContractName = 'StoppablePattern';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  console.log('\n Deploying StoppablePattern contract...');

  const StoppableResult = await deploy(ContractName, {
    args: [deployer],
    contract: ContractName,
    from: deployer,
    skipIfAlreadyDeployed: false,
    autoMine: true,
  });

  const stoppableAddress = StoppableResult.address;

  console.log('\n  Contract Deployment Complete!\n');
  console.log('-ContractName                       ', stoppableAddress);

  return true;
};

export default func;
const id = ContractName + version;
func.tags = [id, version];
func.id = id;
