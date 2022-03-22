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
  const [getRarityChose, setRarityChose]:any = useState([]);
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
        setNFTDataFilter(rawData.reverse());
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

  const filter = async (data:any) =>{
    // console.log(getRarityChose.indexOf(data))
    let list:any = []
    if(getRarityChose.indexOf(data) == -1){
      setRarityChose([...getRarityChose, data]);
      list = [...getRarityChose, data]
    }else{
      setRarityChose(getRarityChose.filter((item:any)=>item != data))
    }
    console.log(list)
    setNFTDataFilter(nftData);
    setNFTDataFilter(nftData.filter((item:any)=>list.indexOf(item.data.rarity) != -1))
    if(list.length == 0){
      setNFTDataFilter(nftData);
    }
    
  }

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
                  onClick={()=>filter(item)}
                  id={`rarity${item}`}
                  value="option1"
                />
                <label
                  className="form-check-label inline-block "
                  htmlFor={`rarity${item}`}
                >
                  {item}
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
