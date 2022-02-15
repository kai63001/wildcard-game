import Image from "next/image";
import { useEffect, useState } from "react";
import { getUriFromTokenId, init, addSell } from "@/lib/Web3Client";

const MyCard = (props: any) => {
  const [nft, setNft]: any = useState({});

  const [price, setPrice] = useState(0);

  useEffect(() => {
    init().then(async (_data: any) => {
      getUriFromTokenId(props.tokenId).then(async (data: any) => {
        const req = await fetch(data);
        const resreq = await req.json();
        setNft(resreq);
      });
    });
  }, []);

  const sellItem = () => {
    if (price < 0.01) {
      alert("Please enter a price greater than 0.01");
      return;
    }
    addSell(props.tokenId, price).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-2 relative rounded-md overflow-hidden">
        {nft.image ? (
          <Image
            className="rounded-md h-96"
            src={nft.image}
            alt={nft.name}
            title={nft.name}
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
          {nft.name} #{props.tokenId}
        </h1>
        <p className="mt-8 text-2xl">Rarity : {nft.rarity}</p>
        <p className="mt-8 text-2xl">Price : </p>
        <div>
          <input
            onChange={(e: any) => setPrice(e.target.value)}
            type="number"
            step=".01"
            min="0.01"
            className="rounded-md px-2 py-1 text-gray-300 bg-gray-900"
            placeholder="0.01"
          />{" "}
          <span className="ml-3">BNB</span>
        </div>
        <button
          onClick={() => {
            sellItem();
            // getHistoryTrasaction('0xF58F1e730fd6bDd0c239E1D83eaB9d87132eF723',1,1000,1)
          }}
          className="mt-3 px-10 py-2 bg-red-500 rounded-md"
        >
          SELL NOW
        </button>
      </div>
    </div>
  );
};

export default MyCard;
