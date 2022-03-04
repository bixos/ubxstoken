const {
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const UbxsToken = artifacts.require("UbxsToken");

contract("UbxsToken", ([sender, receiver]) => {
  let ubxsToken;
  const value = new BN(1);

  // Hook that autoruns before each test function
  beforeEach("should setup the contract instance", async () => {
    // Set the UBXS Token contract
    ubxsToken = await UbxsToken.deployed();
  });

  it("the token name should be correct", async () => {
    const name = await ubxsToken.name();

    assert.equal(name, "UBXS Token", "The token name must be UBXS Token.");
  });

  it("the token symbol should be correct", async () => {
    const symbol = await ubxsToken.symbol();

    assert.equal(symbol, "UBXS", "The token symbol must be UBXS.");
  });

  it("the token decimal should be correct", async () => {
    const decimals = (await ubxsToken.decimals()).toNumber();

    assert.equal(decimals, 6, "The token decimal must be 6.");
  });

  it("the token supply should be correct", async () => {
    const supply = (await ubxsToken.totalSupply()).toNumber();
    const decimals = (await ubxsToken.decimals()).toNumber();

    assert.equal(
      supply,
      100_000_000 * 10 ** decimals,
      "The token supply must be 100.000.000."
    );
  });

  it("reverts when transferring tokens to the zero address", async () => {
    // Conditions that trigger a require statement can be precisely tested
    await expectRevert(
      ubxsToken.transfer(constants.ZERO_ADDRESS, value, {
        from: sender,
      }),
      "ERC20: transfer to the zero address"
    );
  });

  it("emits a Transfer event on successful transfers", async () => {
    const receipt = await ubxsToken.transfer(receiver, value, {
      from: sender,
    });

    // Event assertions can verify that the arguments are the expected ones
    expectEvent(receipt, "Transfer", {
      from: sender,
      to: receiver,
      value: value,
    });
  });
});
