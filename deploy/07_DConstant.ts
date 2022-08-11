import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const version = 'v0.0.0';
const ContractName = 'Constant';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  console.log('\n Deploying Constant contract...');

  const ConstantResult = await deploy(ContractName, {
    args: [],
    contract: ContractName,
    from: deployer,
    skipIfAlreadyDeployed: false,
    autoMine: true,
  });

  const constantAddress = ConstantResult.address;

  console.log('\n  Contract Deployment Complete!\n');
  console.log('-ContractName                       ', constantAddress);

  return true;
};

export default func;
const id = ContractName + version;
func.tags = [id, version];
func.id = id;
