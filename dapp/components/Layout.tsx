import Header from "./Header";
import dynamic from "next/dynamic";
import Head from 'next/head';
const Navbar = dynamic(
  //@ts-ignore
  () => import("@/components/Navbar"),
  { ssr: false }
);
const Layout = (props: any) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
      </Head>
      <Header
        title={props.title}
        des={props.des}
        can={props.can}
        image={props.image}
      />
      <header>
        <Navbar />
      </header>
      <main className="max-w-screen-xl mx-auto mt-3 px-2 xs:px-0">
        {props.children}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;