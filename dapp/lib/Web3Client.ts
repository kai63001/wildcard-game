import { ethers } from "ethers";
import data from "../../artifacts/contracts/Card.sol/WileCard.json"; // get data abi
import addressData from "../../deploy.json";

const conTractAddress = addressData.address; // * nft contractaddress
// * abi of nft address
const abi = data.abi;

let contract: ethers.Contract;
let provider: ethers.providers.Web3Provider;

/**
 * * for init web3 metamasek
 * @returns true
 */
export const init = async () => {
  //@ts-ignore
  provider = new ethers.providers.Web3Provider(web3.currentProvider, "any");
  provider.on("network", (oldNetwork) => {
    console.log(oldNetwork.chainId);
    if (oldNetwork.chainId != 97) {
      alert("change to BNB testnet pls");
      return false;
    }
  });
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contract = new ethers.Contract(conTractAddress, abi, signer);
  console.log("init");
  return true;
};

export const mint = async (data: string) => {
  return new Promise(function (res, rej) {
    contract.mintNFT([data]).then(async function (transaction: any) {
      console.log("transaction");
      console.log(transaction);
      let transactionReceipt = null;
      while (transactionReceipt == null) {
        // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await provider.getTransactionReceipt(
          transaction.hash
        );
        await sleep(1000);
      }
      res(transaction);
    });
  });
};

/**
 * * func get my nft in smart contract
 * @returns my NFTs
 */
export const getUserToken = () => {
  return new Promise(function (res, rej) {
    contract.getUserToken().then(async function (transaction: any) {
      let data = await transaction.filter(
        (data: any) => data.toNumber() != 0 && data.toNumber()
      );
      data = await data.map((data: any) => data.toNumber());
      // ? promise to get tokeURI from array token id like [1,2,3]
      const promises = await data.map(async (data: unknown) => {
        const url = new Promise((resolve, reject) => {
          resolve(contract.tokenURI(data));
        });
        return url;
      });
      const urls = await Promise.all(promises);
      const dataIds = urls.map(async (req: any, index: number) => {
        const url = new Promise(async (resolve, reject) => {
          const dataFect: any = await fetch(req);
          let urlMerge = await dataFect.json();
          urlMerge["tokenId"] = data[index];
          resolve(urlMerge);
        });
        return url;
      });
      console.log("dataIds : " + (await dataIds));
      const numFruits = await Promise.all(dataIds);
      res(await numFruits);
    });
  });
};

export const getUserTokenViaAddress = (contract: any) => {
  return new Promise(function (res, rej) {
    contract
      .getUserTokenWithAddress("0xF58F1e730fd6bDd0c239E1D83eaB9d87132eF723")
      .then(async function (transaction: any) {
        let data = await transaction.filter(
          (data: any) => data.toNumber() != 0 && data.toNumber()
        );
        data = await data.map((data: any) => data.toNumber());
        // ? promise to get tokeURI from array token id like [1,2,3]
        const promises = await data.map(async (data: unknown) => {
          const numFruit = new Promise((resolve, reject) => {
            resolve(contract.tokenURI(data));
          });
          return numFruit;
        });
        const numFruits = await Promise.all(promises);
        res(await numFruits);
      });
  });
};

/**
 * * isAuth is middleware to chekc auth web3 or metamask connected or not
 * @returns string my address
 */
export const isAuth = async () => {
  let address = "";
  const signer = provider?.getSigner();
  address = await signer?.getAddress();
  return address;
};

/**
 * * random card nft
 * @returns
 */
export const randomNFT = async () => {
  return new Promise(function (res, rej) {
    try {
      contract
        .randomNFT()
        .then(async function (transaction: any) {
          let transactionReceipt = null;
          while (transactionReceipt == null) {
            transactionReceipt = await provider.getTransactionReceipt(
              transaction.hash
            );
            await sleep(1000);
          }
          res(transaction)
        })
        .catch((_error: any) => {
          rej("out of nft in collection");
        });
    } catch (error) {
      rej("out of nft");
    }
  });
  
};

export const getUriFromTokenId = async (id: number) => {
  //return Promise
  return new Promise(function (res, rej) {
    contract.tokenURI(id).then(async function (transaction: any) {
      console.log("getUriFromTokenId");
      res(await transaction);
    });
  });
};

export const addSell = async (id: any, price: number) => {
  // console.log((parseFloat(price) * (10 ** 8)))
  return new Promise(function (res, rej) {
    contract
      .addItemToMarket(id, price * 10 ** 18)
      .then(async function (transaction: any) {
        let transactionReceipt = null;
          while (transactionReceipt == null) {
            transactionReceipt = await provider.getTransactionReceipt(
              transaction.hash
            );
            await sleep(1000);
          }
        res(transaction);
      });
  });
};

export const getSellNftList = () => {
  // contract.tokenURI
  return new Promise(function (res, rej) {
    contract.getUnsoldItems().then(async function (transaction: any) {
      console.log("HELLO");
      // let data = await transaction.filter(
      //   (data: any) => data.itemId.toNumber() != 0 && data.itemId.toNumber()
      // );
      let data = await transaction.map((item: any) => {
        console.log("WTF");
        let req = item.tokenId.toNumber();
        let price = item.price.toNumber();
        let newData = {
          ...item,
          ["tokenId"]: req,
          ["price"]: price,
        };
        return newData;
      });
      const dataIds = data.map(async (req: any, index: number) => {
        const url = new Promise(async (resolve, reject) => {
          const dataFect: any = await fetch(await req.tokenURI);
          let urlMerge = await dataFect.json();
          let newData = {
            ...req,
            data: urlMerge,
          };
          // console.log(newData)
          resolve(newData);
        });
        return url;
      });
      const numFruits = await Promise.all(dataIds);
      let endData: any[] = [];
      numFruits.forEach((data) => {
        endData.push(data);
      });
      console.log("endData");
      console.log(endData);
      res(await endData);
    });
  });
};

const sleep = (milliseconds: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getSellingNft = (itemId:number) => {
  console.log('asdasdas')
  return new Promise(function (res, rej) {
    contract
      .getMarketItemById(itemId)
      .then(async function (transaction: any) {
          console.log("WTF");
          let req = transaction.tokenId.toNumber();
          let price = transaction.price.toNumber();
          let newData = {
            ...transaction,
            ["tokenId"]: req,
            ["price"]: price,
          };
          const fetchData = await fetch(newData.tokenURI);
          newData = {
            ...newData,
            data : await fetchData.json()
          }
        res(newData);
      });
  });
}


export const buyNFT = (itemId:any,price:any) => {
  return new Promise(function (res, rej) {
    contract
      .sellItemAndTransferOwnership(itemId, {value:price})
      .then(async function (transaction: any) {
        let transactionReceipt = null;
          while (transactionReceipt == null) {
            transactionReceipt = await provider.getTransactionReceipt(
              transaction.hash
            );
            await sleep(1000);
          }
        res(transaction);
      });
  });
}


//10000000000000 = 0.00001
//100000000000000 = 0.0001