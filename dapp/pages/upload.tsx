import Input from "@/components/form/Input";
import Layout from "@/components/Layout";
import { create } from "ipfs-http-client";
import { mint, getUserToken } from "@/lib/Web3Client";
import { useState } from "react";
import Spining from "@/components/Animation/spining";
import Image from "next/image";

const UploadPage = () => {
  const [mining, setMining] = useState(false);

  const NFTData = [
    {
      image:
        "https://ipfs.infura.io/ipfs/QmWAJZnCdWxN17GW4Wi1HA2NFhGx8TATzMxL1XNUZUGitr",
      data: "https://ipfs.infura.io/ipfs/QmPfaA5bQn6uUwU5pDtBS44pFxZb5ECcRehG858hnRo1i8",
      id: 1,
    },
    {
      image:
        "https://ipfs.infura.io/ipfs/QmYocvY7GvF84Ph2HYK6U26LCdzjmcCZ849EzFbYJdNR7E",
      data: "https://ipfs.infura.io/ipfs/QmNushQVe6o6vBLscoFnfrRd5ek4vt8XvyZJKmumZ5MsVc",
      id: 2,
    },
    {
      image:
        "https://ipfs.infura.io/ipfs/QmdiKyNCL2rkoTqpepzJK6n94iiF8j4NwUu9Uefsn2mwtf",
      data: "https://ipfs.infura.io/ipfs/QmQs2o1wtbG35i1z2sCdV1QPAmBk34PwEKccJXSoS5QNpy",
      id: 3,
    },
    {
      image:
        "https://ipfs.infura.io/ipfs/QmQNnYJzxUEAxbRwKHsN16nT6PjhjTSTxag9PT8Pde9nHo",
      data: "https://ipfs.infura.io/ipfs/QmQEKbmAu9JB5LMjs7MdfyrmVH7bwCcZDDdVWmoNGY7RhX",
      id: 4,
    },
    {
      image:
        "https://ipfs.infura.io/ipfs/QmXh3DC6BxTiY7NiUmrQNjiyZz5265VkFM8RF7bKFuGbNe",
      data: "https://ipfs.infura.io/ipfs/QmTkcz4AAWCNQYvwm7qgtAr5BBgiykE9fmyCRL7ErGcHv3",
      id: 5,
    },
  ];

  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });
  const mintNFT = async (e: any) => {
    e.preventDefault();
    setMining(true);
    // upload file to ipfs
    const image = await addFile({
      path: "/",
      content: e.target.image.files[0],
    });
    // add data
    const data = {
      name: e.target.name.value,
      rarity: e.target.rarity.value,
      id: e.target.id.value,
      image: `https://ipfs.infura.io/ipfs/${image}`,
    };
    // push data to ipfs
    const res = await addFile({
      path: "/",
      content: Buffer.from(JSON.stringify(data)),
    });
    console.log(`https://ipfs.infura.io/ipfs/${res}`);
    await mint([`https://ipfs.infura.io/ipfs/${res}`]).then((_data) => {
      setMining(false);
      //clear form
      e.target.reset();
    });
  };

  const addFile = async ({ path, content }: any) => {
    const file = { path: path, content: content };
    const filesAdded: any = await ipfs.add(file);
    return filesAdded.cid;
  };

  const list = async () => {
    const test = await getUserToken().then((data: any) => {
      return data;
    });
  };

  const mintAll = async (e: any) => {
    e.preventDefault();
    setMining(true);
    const listNft = [];

    for (let i = 0; i < e.target.length - 1; i++) {
      for (let j = 0; j < e.target[i].value; j++) {
        listNft.push(NFTData[i].data);
      }
    }
    await mint(listNft).then((_data) => {
      setMining(false);
      //clear form
      e.target.reset();
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4 mt-10">
        <div className="col-span-1">
          <div className="border-2 border-gray-800">
            <div className="p-4 bg-gray-800 text-white">
              <h1>MINT NFT</h1>
            </div>
            <div className="p-4">
              <form onSubmit={mintNFT}>
                <Input placeholder="name" name="name" required />
                <Input placeholder="id" type="number" name="id" required />
                <select
                  name="rarity"
                  className="w-full text-gray-700 bg-white mb-2 px-2 py-2 border-2"
                  id="rarity"
                  defaultValue={"F"}
                  required
                >
                  <option value="F" disabled>
                    Rarity
                  </option>
                  <option value="B">B</option>
                  <option value="A">A</option>
                  <option value="S">S</option>
                  <option value="R">R</option>
                  <option value="SR">SR</option>
                  <option value="SSR">SSR</option>
                </select>
                <Input placeholder="image" type="file" name="image" required />
                <button
                  type="submit"
                  disabled={mining}
                  className="bg-gray-900 text-white py-2 w-full"
                >
                  {mining && <Spining />}
                  MINT
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-800 col-span-3">
          <div className="p-4 bg-gray-800 text-white">
            <h1>MINT NFT IN GAME CARD</h1>
          </div>
          <div className="p-4">
            <form onSubmit={mintAll}>
              <div className="grid grid-cols-4 gap-4 h-full">
                {NFTData.map((data: any, i: any) => {
                  return (
                    <div className="" key={i}>
                      <div className="relative w-full h-80">
                        <Image
                          className="max-h-56"
                          src={data.image}
                          alt={""}
                          title={""}
                          layout="fill"
                          quality={100}
                          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          placeholder="blur"
                        />
                      </div>
                      <input
                        type="number"
                        id={`nft_${data.id}`}
                        name={`nft_${data.id}`}
                        className="mt-3 border-2 text-center w-full"
                        min={0}
                        required
                      />
                    </div>
                  );
                })}
              </div>
              <button
                disabled={mining}
                className="mt-4 text-center w-full bg-gray-800 py-3 text-white"
              >
                {" "}
                {mining && <Spining />} Mint
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;
