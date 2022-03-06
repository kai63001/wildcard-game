import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
//import getUsertoken
import { getUserToken, init } from "@/lib/Web3Client";
import LoadingCard from "@/components/Card/loading";
import Card from "@/components/Card/MyCard";
import Modal from 'react-modal';
import { useRouter } from "next/router";
import MyCard from "@/components/Modal/MyCard";

const SellCard = () => {
  const router = useRouter();
  const [myNft, setMyNft] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("testsss");
    reqMft();
    //@ts-ignore
    window.ethereum.on("accountsChanged", function (accounts) {
      setMyNft([]);
      setLoading(false);
      reqMft();
    });
  }, []);

  const reqMft = async () => {
    init().then((data: any) => {
      if (!data) {
        return;
      }
      getUserToken().then((data: any) => {
        setMyNft(data.reverse());
        setLoading(true);
      });
    });
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "white",
      color: "black",
      borderRadius: "0px"
    },
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4">MY NFTs</h1>
      <div className="grid grid-cols-5 gap-4">
        {!loading &&
          [...Array(10)].map((item, index) => <LoadingCard key={index} />)}
        {myNft.map((item: any, index) => {
          return <Card item={item} key={index}></Card>;
        })}
      </div>
      <Modal ariaHideApp={false} onRequestClose={()=>router.push('/marketplace/my')} style={customStyles} isOpen={!!router.query.tokenId}>
        <MyCard tokenId={router.query.tokenId} />
      </Modal>
    </Layout>
  );
};

export default SellCard;
