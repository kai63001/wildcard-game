import { getUserToken, getUserTokenViaAddress } from "@/lib/Web3Client";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../../artifacts/contracts/Card.sol/WileCard.json"; // get data abi
import addressData from "../../../deploy.json";

const conTractAddress = addressData.address; // * nft contractaddress
// * abi of nft address
const abi = data.abi;

let provider: ethers.providers.Web3Provider;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  // console.log(contract)
  if(!req.query.address){
    res.json({
        status:'address query request'
    })
  }
  console.log(req.query.address)
  const test = await dataCon(req.query.address == undefined ? '0xF58F1e730fd6bDd0c239E1D83eaB9d87132eF723' : req.query.address.toString()).then((data: any) => {
    return (data)
  });
  console.log("data :" + (await test));
  res.json(await test);
}

const dataCon =(address:string) => {
    return new Promise(function (res, rej) {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://eth-ropsten.alchemyapi.io/v2/ItzlUeRdcRPFxf0LpW4ggGAu6R0AnjJs",
            "ropsten"
          );
          let contract: any = new ethers.Contract(conTractAddress, abi, provider);
        contract
          .getUserTokenWithAddress(address)
          .then(async function (transaction: any) {
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
            const dataIds = urls.map(async (data: any) => {
              const url = new Promise(async (resolve, reject) => {
                const dataFect = await fetch(data);
                resolve(await dataFect.json());
              });
              return url;
            });
            console.log("dataIds : "+ await dataIds);
            const numFruits = await Promise.all(dataIds)
            res(await numFruits);
          });
      });
}
