import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const version = "v0.0.0"
const ContractName = "LockV4"


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts()
  
    console.log("\n Deploying LockV4 contract...")
  
    const LockV4Result = await deploy(ContractName, {
      args: ["Hello"],
      contract: ContractName,
      from: deployer,
      skipIfAlreadyDeployed: false,

      autoMine: true,
    });
  
    const greeterAddr = LockV4Result.address;
  
    console.log("\n  Contract Deployments Complete!\n");
    console.log("-ContractName                       ", greeterAddr);
  
    return true;
  };
  
  export default func;
  const id = ContractName + version;
  func.tags = [id, version];
  func.id = id;