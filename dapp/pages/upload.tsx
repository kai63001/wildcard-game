import Input from "@/components/form/Input";
import Layout from "@/components/Layout";
import { create } from "ipfs-http-client";
import { mint } from "@/lib/Web3Client"

const UploadPage = () => {
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });
  const mintNFT = async (e: any) => {
    e.preventDefault();
    // upload file to ipfs
    const image = await addFile({path:'/',content:e.target.image.files[0]})
    // add data
    const data = {
        name: e.target.name.value,
        price: e.target.price.value,
        id: e.target.id.value,
        image: `https://ipfs.infura.io/ipfs/${image}`
    }
    // push data to ipfs
    const res = await addFile({path:'/',content:Buffer.from(JSON.stringify(data))})
    console.log(`https://ipfs.infura.io/ipfs/${res}`)
    await mint(`https://ipfs.infura.io/ipfs/${res}`)
  };

  const addFile = async ({ path, content }: any) => {
    const file = { path: path, content: content };
    const filesAdded: any = await ipfs.add(file);
    return filesAdded.cid;
  };
  
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4 mt-10">
        <div className="border-2 border-gray-800 col-span-1">
          <div className="p-4 bg-gray-800">
            <h1>MINT NFT</h1>
          </div>
          <div className="p-4">
            <form onSubmit={mintNFT}>
              <Input placeholder="name" name="name" required />
              <Input placeholder="price" type="number" name="price" required />
              <Input placeholder="id" type="number" name="id" required />
              <Input placeholder="image" type="file" name="image" required />
              <button type="submit" className="bg-gray-900 py-2 w-full">
                MINT
              </button>
            </form>
          </div>
        </div>
        <div className="col-span-2 bg-red-300"></div>
      </div>
    </Layout>
  );
};

export default UploadPage;
