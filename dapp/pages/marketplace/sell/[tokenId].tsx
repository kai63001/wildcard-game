import Layout from "@/components/Layout";
import SellCardComponent from "@/components/Modal/SellCard";

const SellNft = (props:any) => {
  return (
    <Layout>
        <SellCardComponent tokenId={props.tokenId} />
    </Layout>
  );
};

export async function getServerSideProps({ query }: any) {
    const { tokenId } = query;
    return { props: { tokenId } };
  }

export default SellNft;
