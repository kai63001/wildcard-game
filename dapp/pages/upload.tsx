import Input from "@/components/form/Input";
import Layout from "@/components/Layout";

const UploadPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4 mt-10">
        <div className="border-2 border-gray-800 col-span-1">
          <div className="p-4 bg-gray-800">
            <h1>MINT NFT</h1>
          </div>
          <div className="p-4">
            <form>
              <Input placeholder="name" name="name" required />
              <Input placeholder="price" type="number" name="price" required />
              <Input placeholder="id" type="number" name="id" required />
              <Input placeholder="image" type="file" name="id" required />
              <button type="submit" className="bg-gray-900 py-2 w-full">MINT</button>
            </form>
          </div>
        </div>
        <div className="col-span-2 bg-red-300"></div>
      </div>
    </Layout>
  );
};

export default UploadPage;
