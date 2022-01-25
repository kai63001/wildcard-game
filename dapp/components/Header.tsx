import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
const Header = (props:any) => {
  const router = useRouter();
  return (
    <NextSeo
      title={
        props.title
          ? `${props.title} | Wile Game`
          : "Wile Game"
      }
      description={
        props.des
          ? props.des
          : "Wile Game"
      }
      canonical={`https://wilegame.com${router.asPath}`}
      openGraph={{
        type: "website",
        locale: "en_EN",
        title: props.title
          ? `${props.title} | Wile Game`
          : "Wile Game",
        description: props.des
          ? props.des
          : "Wile Game",
        images: [
          {
            url:
              props.image == undefined || props.image.length == 0
                ? "https://wilegame.com/main.jpg"
                : props.image,
          },
        ],
        url: `https://wilegame.com${router.asPath}`,
        site_name: "wallss",
      }}
      twitter={{
        handle: "@wilegame",
        site: "@wilegame",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default Header;