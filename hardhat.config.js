require("@nomiclabs/hardhat-waffle");
const secret = require("./secret.json");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const ALCHEMY_API_KEY = "ItzlUeRdcRPFxf0LpW4ggGAu6R0AnjJs";

 const ROPSTEN_PRIVATE_KEY = "92b9e2d4b81cf583d48440d3722f600c0b8a124da49411417436c15e0c16e0f8";

module.exports = {
  solidity: "0.8.5",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
    testnet: {
      url: secret.url,
      chainId: 97,
      accounts: [secret.key],
    },
  },
};
