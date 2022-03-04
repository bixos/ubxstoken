const UbxsToken = artifacts.require("UbxsToken");

module.exports = function (deployer) {
  // Deploy the UbxsToken Contract
  deployer.deploy(UbxsToken, 100_000_000_000_000);
};
