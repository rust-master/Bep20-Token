const Bep20Token = artifacts.require("Bep20Token");

module.exports = function (deployer) {
  deployer.deploy(Bep20Token);
};
