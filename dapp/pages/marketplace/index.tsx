import Layout from "@/components/Layout";
import Link from "next/link";

const Marketplace = () => {
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4">
        <div className="...">
          <h2 className="text-2xl mb-3">Management</h2>
          <button className="text-center w-full py-2 bg-red-400 rounded-md mb-2">
            Random Card
          </button>
          <Link href="/marketplace/sell">
          <a className="text-center w-full py-2 bg-blue-400 rounded-md block">
            Sell Card
          </a>
          </Link>
        </div>
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
