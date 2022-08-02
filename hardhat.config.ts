import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "hardhat-deploy";
import "hardhat-abi-exporter";

import networks from "./hardhat.networks";
import namedAccounts from "./hardhat.accounts";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings:{
          optimizer:{
            enabled: true,
            runs: 200,
          },
        }
      },
      {
        version: "0.5.16",
        settings:{
          optimizer: {
            enabled: true,
            runs: 999999
          }
        },
      },
      {
        version: "0.4.20",
        settings:{
          optimizer: {
            enabled: true,
            runs: 999999
          }
        },
      }
    ]
  },
  networks,
  namedAccounts,
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  abiExporter: {
    path: "./abis",
    runOnCompile: true,
    clear: true,
    spacing: 2,
    pretty: true,
  }
};

export default config;