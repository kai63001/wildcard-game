import Layout from "@/components/Layout";
import Link from "next/link";
import { randomNFT, getSellNftList, init } from "@/lib/Web3Client";
import { useEffect, useState } from "react";
import Loading from "@/components/Card/loading";
import SellCard from "@/components/Card/SellCard";
import Spining from "@/components/Animation/spining";
import { useRouter } from "next/router";
import Modal from "react-modal";
import SellCardComponent from "@/components/Modal/SellCard";

const Marketplace = () => {
  const router = useRouter();
  const [nftData, setNFTData] = useState([]);
  const [nftDataFilter, setNFTDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  const [randoming, setRandoming] = useState(false);

  const listRarity = ["SSR", "SR", "S", "R", "A"];
  const [getRarityChose, setRarityChose]: any = useState([]);
  const getRandom = () => {
    setRandoming(true);
    randomNFT().then((data: any) => {
      setRandoming(false);
      router.push("/marketplace/my");
    });
  };

  useEffect(() => {
    getUnSoleList();
    //@ts-ignore
    window.ethereum.on("accountsChanged", function (accounts) {
      getUnSoleList();
    });
  }, []);

  const getUnSoleList = () => {
    init().then((res) => {
      getSellNftList().then((data: any) => {
        let rawData: any = [];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          let item = {};
          item = {
            ...item,
            data: element.data,
            price: element.price,
            tokenId: element.tokenId,
            itemId: element.itemId,
          };
          rawData.push(item);
          console.log(element.data);
        }
        setNFTData(rawData.reverse());
        setLoading(false);
        setNFTDataFilter(rawData);
      });
    });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      color: "black",
      borderRadius: "0px",
    },
  };

  const filter = async (data: any) => {
    // console.log(getRarityChose.indexOf(data))
    let list: any = [];
    if (getRarityChose.indexOf(data) == -1) {
      setRarityChose([...getRarityChose, data]);
      list = [...getRarityChose, data];
    } else {
      setRarityChose(getRarityChose.filter((item: any) => item != data));
      list = getRarityChose.filter((item: any) => item != data);
    }
    console.log(list);
    setNFTDataFilter(nftData);
    setNFTDataFilter(
      nftData.filter((item: any) => list.indexOf(item.data.rarity) != -1)
    );
    if (list.length == 0) {
      setNFTDataFilter(nftData);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4">
        <div className="...">
          <h2 className="text-2xl mb-3">Management</h2>
          <button
            disabled={randoming}
            onClick={() => getRandom()}
            className="text-center w-full py-2 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white duration-150 rounded-md mb-2"
          >
            {randoming ? <Spining /> : ""}
            <span>Random Card</span>
          </button>
          <Link href="/marketplace/my">
            <a className="text-center w-full py-2 bg-blue-400 rounded-md block">
              My Card
            </a>
          </Link>
          <h2 className="text-2xl mt-3">Rarity</h2>
          {listRarity.map((item, index) => {
            return (
              <div key={index} className="form-check form-check-inline">
                <input
                  className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  onClick={() => filter(item)}
                  id={`rarity${item}`}
                  value="option1"
                />
                <label
                  className="form-check-label inline-block "
                  htmlFor={`rarity${item}`}
                >
                  <div className="flex items-center mb-5">
                    {[...Array(listRarity.length - index)].map((_, index) => {
                      return (
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      );
                    })}
                    {[...Array(index)].map((_, index) => {
                      return (
                        <svg
                          className="w-5 h-5 text-gray-300 dark:text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      );
                    })}
                  </div>
                </label>
              </div>
            );
          })}
        </div>
        <div className="col-span-3">
          <h2 className="text-2xl mb-3">Cards</h2>
          <div className="grid grid-cols-4 gap-4">
            {loading
              ? [...Array(12)].map((item: any, i: any) => <Loading key={i} />)
              : nftDataFilter.map((item: any, i: any) => (
                  <SellCard key={i} item={item} />
                ))}
          </div>
        </div>
        <Modal
          ariaHideApp={false}
          onRequestClose={() => router.push("/marketplace")}
          style={customStyles}
          isOpen={!!router.query.tokenId}
        >
          <SellCardComponent tokenId={router.query.tokenId} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Marketplace;
