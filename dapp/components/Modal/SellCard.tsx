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
      });
    });
  }

  return (
    <>
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-2 relative rounded-md overflow-hidden">
        {nft.data ? (
          <Image
            className="rounded-md h-96"
            src={nft.data.image}
            alt={nft.data.name}
            title={nft.data.name}
            layout="intrinsic"
            width={300}
            height={384}
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            placeholder="blur"
          />
        ) : (
          <div className="bg-gray-900 h-96 animate-pulse rounded-md"></div>
        )}
      </div>
      <div className="col-span-2 h-full">
        <h1 className="text-5xl">
          {nft.data && nft.data.name} #{nft.tokenId}
        </h1>
        <p className="mt-8 text-2xl">Rarity : {nft.data && nft.data.rarity}</p>
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
    <TradingHistory tokenId={props.tokenId}/>
    </>
  );
};

export default SellCardComponent;
