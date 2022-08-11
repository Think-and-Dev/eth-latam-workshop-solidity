const networks: any = {
  hardhat: {
    live: false,
    allowUnlimitedContractSize: true,
    initialBaseFeePerGas: 0,
    chainId: 31337,
    tags: ['test', 'local'],
  },
  localhost: {
    chainId: 31337,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
    timeout: 1000 * 60,
  },
};

export default networks;
