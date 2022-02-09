import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
//import getUsertoken
import { getUserToken, init } from "@/lib/Web3Client";
import LoadingCard from "@/components/Card/loading";

const SellCard = () => {
  const [myNft, setMyNft] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("testsss");
    reqMft();
  }, []);

  const reqMft = async () => {
    await init();
    getUserToken().then((data: any) => {
      setMyNft(data);
      setLoading(true);
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4">MY NFTs</h1>
      <div className="grid grid-cols-5 gap-4">
        {!loading &&
          [...Array(10)].map((item, index) => <LoadingCard key={index} />)}
        {myNft.map((item: any, index) => {
            console.log(item);
          return (
            <div key={index}>
              <div className="bg-white overflow-hidden rounded-md text-gray-900">
                <img src={item.image} alt="" />
                <div className="my-2 p-2">
                  <h3>Cool Cat #123</h3>
                  <p className="text-smm text-gray-600">0.001 ETH</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default SellCard;
