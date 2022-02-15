import Layout from "@/components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUriFromTokenId, init ,addSell} from "@/lib/Web3Client";
import { useRouter } from "next/router";
import MyCard from "@/components/Modal/MyCard";

const MyTokenIdNft = (props: any) => {
  

  return (
    <Layout>
      <MyCard tokenId={props.tokenId} />
    </Layout>
  );
};

export async function getServerSideProps({ query }: any) {
  const { tokenId } = query;
  return { props: { tokenId } };
}

export default MyTokenIdNft;
