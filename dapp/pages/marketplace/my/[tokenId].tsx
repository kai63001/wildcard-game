import Layout from "@/components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUriFromTokenId, init } from "@/lib/Web3Client";
import { useRouter } from "next/router";

const MyTokenIdNft = (props: any) => {
  const [nft, setNft]: any = useState({});
  useEffect(() => {
    init().then(async (_data: any) => {
      getUriFromTokenId(props.tokenId).then(async (data: any) => {
        const req = await fetch(data);
        const resreq = await req.json();
        setNft(resreq);
      });
    });
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-1 relative rounded-md overflow-hidden">
          {nft.image ? (
            <Image
              className="rounded-md h-96"
              src={nft.image}
              alt={nft.name}
              title={nft.name}
              layout="intrinsic"
              width={300}
              height={384}
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              placeholder="blur"
              objectFit="cover"
            />
          ) : (
            <div className="bg-gray-900 h-96 animate-pulse rounded-md"></div>
          )}
        </div>
        <div className="col-span-3 h-full">
          <h1
            className="text-2xl"
            onClick={() => {
              console.log(nft);
            }}
          >
            {nft.name} #{props.tokenId}
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }: any) {
  const { tokenId } = query;
  return { props: { tokenId } };
}

export default MyTokenIdNft;
