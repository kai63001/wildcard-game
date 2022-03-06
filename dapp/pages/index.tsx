import Layout from "@/components/Layout";
import Link from "next/Link"

const Home = () => {
  const Nav = ["Home","About","Marketplace","Contact"];
  return (
    <Layout noFull noNavbar>
      <div className=" w-full flex overflow-y-hidden relative">
        {/* navbar absoulte */}
        <div className="absolute top-0 left-0 w-full">
          <div className="max-w-screen-xl mx-auto mt-3 px-2 xs:px-0 flex justify-between">
            <div className="text-2xl mt-1 ">
            <Link href="/">
              <a className="">WILE GAME</a>
            </Link>
          </div>
            <div className="flex justify-between w-1/3">
              {/* loop Nav */}
              {Nav.map((item,index)=>{
                return (
                  <div className="text-1xl mt-2">
                    <Link href={`/${item.toLowerCase()}`}>
                      <a className="hover:bg-gray-600 px-4 py-2 duration-300 rounded-md">
                        {item}
                      </a>
                    </Link>
                  </div>
                )
              })}
            </div>
            <div className="mt-2">
              asdasdas
            </div>
          </div>
        </div>
        <img
        width={"100%"}
          className="m-auto h-screen w-full object-cover overflow-y-hidden"
          src="https://www.teahub.io/photos/full/361-3611215_pixel-art.jpg"
          alt=""
        />
        
        <br />
      </div>
      asdasdasd
    </Layout>
  );
};

export default Home;
