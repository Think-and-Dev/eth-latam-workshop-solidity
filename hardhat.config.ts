/* eslint-disable node/no-unpublished-import */
import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

import 'hardhat-deploy';
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';

import networks from './hardhat.networks';
import namedAccounts from './hardhat.accounts';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
      {
        version: '0.4.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
    ],
  },
  networks,
  namedAccounts,
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    gasPrice: 47,
    currency: 'USD',
    excludeContracts: ['LockV8'],
    // onlyCalledMethods: false,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    strict: true,
    except: ['console'],
  },
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    spacing: 2,
    pretty: true,
  },
};

export default config;
