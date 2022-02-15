import Input from "@/components/form/Input";
import Layout from "@/components/Layout";
import { create } from "ipfs-http-client";
import { mint, getUserToken } from "@/lib/Web3Client";
import { useState } from "react";
import Spining from "@/components/Animation/spining";

const UploadPage = () => {

  const [mining,setMining] = useState(false);

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
    await mint(`https://ipfs.infura.io/ipfs/${res}`).then((_data)=>{
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
    console.log(test);
  };

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4 mt-10">
        <div className="">
          <div className="border-2 border-gray-800 col-span-1">
            <div className="p-4 bg-gray-800">
              <h1>MINT NFT</h1>
            </div>
            <div className="p-4">
              <form onSubmit={mintNFT}>
                <Input placeholder="name" name="name" required />
                <Input placeholder="id" type="number" name="id" required />
                <select
                  name="rarity"
                  className="w-full text-gray-700 bg-white mb-2 px-2 py-2"
                  id="rarity"
                  defaultValue={'F'}
                  required
                >
                  <option value="F" disabled>
                    Rarity
                  </option>
                  <option value="B">
                    B
                  </option>
                  <option value="A">
                    A
                  </option>
                  <option value="S">
                    S
                  </option>
                  <option value="R">
                    R
                  </option>
                  <option value="SR">
                    SR
                  </option>
                  <option value="SSR">
                    SSR
                  </option>
                </select>
                <Input placeholder="image" type="file" name="image" required />
                <button type="submit" disabled={mining} className="bg-gray-900 py-2 w-full">
                  {mining && <Spining />}
                  MINT
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-red-300">
          <button onClick={list}>test</button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;
