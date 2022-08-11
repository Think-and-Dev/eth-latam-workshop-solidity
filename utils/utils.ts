import chalk from 'chalk';
export const getUnlockTime = (): number => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  return currentTimestampInSeconds + ONE_YEAR_IN_SECS;
};

export const printSuccess = (text: String): void => {
  console.log(chalk.green(text));
};

export const printError = (text: String): void => {
  console.log(chalk.red(text));
};

export const printInfo = (text: String): void => {
  console.log(chalk.yellow(text));
};

export const printDeploySuccessful = (contractName: String, address: String) => {
  printInfo('\n Contract Deployment Complete!\n');
  printSuccess(`  ContractName ${contractName}\n`);
  printSuccess(`  ContractAddress - ${address}`);
};
