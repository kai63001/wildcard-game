import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
const Header = (props:any) => {
  const router = useRouter();
  return (
    <NextSeo
      title={
        props.title
          ? `${props.title} | Wild Game`
          : "Wild Game"
      }
      description={
        props.des
          ? props.des
          : "Wild Game"
      }
      canonical={`https://wilegame.com${router.asPath}`}
      openGraph={{
        type: "website",
        locale: "en_EN",
        title: props.title
          ? `${props.title} | Wilr Game`
          : "Wild Game",
        description: props.des
          ? props.des
          : "Wild Game",
        images: [
          {
            url:
              props.image == undefined || props.image.length == 0
                ? "https://wildgame.com/main.jpg"
                : props.image,
          },
        ],
        url: `https://wildgame.com${router.asPath}`,
        site_name: "wallss",
      }}
      twitter={{
        handle: "@wildgame",
        site: "@wildgame",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default Header;