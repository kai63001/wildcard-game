import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
//import getUsertoken
import { getUserToken, init } from "@/lib/Web3Client";
import LoadingCard from "@/components/Card/loading";
import Card from "@/components/Card/MyCard";

const SellCard = () => {
  const [myNft, setMyNft] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("testsss");
    reqMft();
    //@ts-ignore
    window.ethereum.on("accountsChanged", function (accounts) {
      setLoading(false);
      reqMft();
    });
  }, []);

  const reqMft = async () => {
    await init();
    getUserToken().then((data: any) => {
      setMyNft(data.reverse());
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
            <Card item={item} key={index}>
              
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default SellCard;
