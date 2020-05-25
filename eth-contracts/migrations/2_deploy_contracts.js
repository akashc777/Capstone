// migrating the appropriate contracts
var CustomERC721Token = artifacts.require("./CustomERC721Token.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(CustomERC721Token);
};
