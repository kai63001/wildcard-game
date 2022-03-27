import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSellingNft, init , buyNFT } from "@/lib/Web3Client";
import Image from "next/image"
import Spining from "@/components/Animation/spining";
import TradingHistory from "../Card/TradingHistory";

const SellCardComponent = (props: any) => {
  const router = useRouter();
  const [nft,setNft]:any = useState({})
  const [onBuying,setOnBuying]:any = useState(false)
  useEffect(() => {
    getDataSeller();
  }, []);

  const getDataSeller = () => {
    init().then((req) => {
      getSellingNft(props.tokenId).then((data: any) => {
        setNft(data);
      });
    });
  };

  const letBuyNft = () => {
    setOnBuying(true)
    init().then((req) => {
      buyNFT(props.tokenId,nft.price).then((data: any) => {
        setOnBuying(false);
        router.push('/marketplace/my')
      }).catch((err) => {
        setOnBuying(false);
        alert("Not enough money")
      });
    });
  }

  const returnRarity = (data: string) => {
    switch (data) {
      case "SSR":
        return 5;
      case "SR":
        return 4;
      case "S":
        return 3;
      case "R":
        return 2;
      case "A":
        return 1;
      default:
        return "";
    }
  };

  const returnRarityReverse = (data: string) => {
    switch (data) {
      case "SSR":
        return 0;
      case "SR":
        return 1;
      case "S":
        return 2;
      case "R":
        return 3;
      case "A":
        return 4;
      default:
        return "";
    }
  };

  const renderRarity = (data: string) => {
    return (
      <div className="flex items-center mb-5">
        {[...Array(returnRarity(data))].map((_, index) => {
          return (
            <svg
              className="w-7 h-7 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          );
        })}
        {[...Array(returnRarityReverse(data))].map((_, index) => {
          return (
            <svg
              className="w-7 h-7 text-gray-300 dark:text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <>
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-2 relative overflow-hidden">
        {nft.data ? (
          <Image
            className=" h-96"
            src={nft.data.image}
            alt={nft.data.name}
            title={nft.data.name}
            layout="intrinsic"
            width={300}
            height={384}
            quality={100}
            placeholder="empty"
          />
        ) : (
          <div className="bg-gray-900 h-96 animate-pulse rounded-md"></div>
        )}
      </div>
      <div className="col-span-2 h-full">
        <h1 className="text-5xl">
          {nft.data && nft.data.name} #{nft.tokenId}
        </h1>
        <p className="mt-8 text-2xl">Rarity : {nft.data && renderRarity(nft.data.rarity)}</p>
        <p className="mt-8 text-2xl">Price : </p>
        <div>
          <input
            type="number"
            step=".01"
            min="0.01"
            disabled
            className="rounded-md px-2 py-1 text-gray-300 bg-gray-900"
            value={nft.price / (10 ** 8)}
          />{" "}
          <span className="ml-3">BNB</span>
        </div>
        <button
          id="sell-button"
          disabled={onBuying}
          onClick={() => {
            letBuyNft();
          }}
          className="mt-3 px-10 py-2 bg-green-500 rounded-md"
        >
          {onBuying && <Spining />}
          <span>BUY NOW</span>
        </button>
      </div>
    </div>
    {nft.data && (
    <TradingHistory price={nft.price / (10 ** 8)} tokenId={nft.tokenId}/>
    )}
    </>
  );
};

export default SellCardComponent;
