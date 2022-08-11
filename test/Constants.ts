import {loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import {expect} from 'chai';
import {ethers, getNamedAccounts} from 'hardhat';

describe('Constants', function () {
  async function deployConstantsFixture() {
    const {token} = await getNamedAccounts();
    const [owner] = await ethers.getSigners();

    const NoConstants = await ethers.getContractFactory('NoConstants');
    const noConstants = await NoConstants.deploy(token);

    const Immutable = await ethers.getContractFactory('Immutable');
    const immutable = await Immutable.deploy(token);

    const Constant = await ethers.getContractFactory('Constant');
    const constant = await Constant.deploy();

    return {noConstants, immutable, constant, owner, token};
  }

  describe('Deployment', function () {
    it('Should set the right values on constructor ', async function () {
      const {noConstants, immutable, constant, token} = await loadFixture(deployConstantsFixture);
      const constantTokenAddr = '0x153073310327caA6abB76F735d115E5c8bA1617B';

      expect(await noConstants.TOKEN()).to.be.equal(token);
      expect(await immutable.TOKEN()).to.be.equal(token);
      expect(await constant.TOKEN()).to.be.not.equal(token);
      expect(await constant.TOKEN()).to.be.equal(constantTokenAddr);
    });
  });
});
