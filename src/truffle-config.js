const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic =
  "fabric story humor nephew blood pull woman clap find sad gorilla east";

module.exports = {
  networks: {
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      gas: 5500000,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.6",
    },
  },
};
