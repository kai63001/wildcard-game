import Layout from "@/components/Layout";
const Marketplace = () => {
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4">
        <div className="...">06</div>
        <div className="col-span-3">
          <h2 className="text-2xl mb-3">Cards</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white overflow-hidden rounded-md text-gray-900">
              <img src="https://marscatsvoyage.com/uploads/tmp/bc/a6/BcA6N6QLd9.png" alt="" />
              <div className="my-2 p-2">
                <h3>Cool Cat #123</h3>
                <p className="text-smm text-gray-600">0.001 ETH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
