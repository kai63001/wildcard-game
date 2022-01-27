import { init, isAuth } from "@/lib/Web3Client";
import { useEffect, useMemo, useState } from "react";
// import { isAuth } from "@/lib/JWT";
// import { Cookies } from "react-cookie";
// const cookies = new Cookies();
import Link from "next/link";

const Navbar = () => {
  const [auth, setAuth] = useState("");
  useEffect(() => {
    getAuth();
  },[auth]);

  const getAuth = async () => {
    try {
      if(!auth){
        init().then(async (data) => {
          setAuth(await isAuth());
        });
      }
    } catch (error) {
      console.log("login first");
    }
  };

  return (
    <nav className="bg-black text-white">
      <div className="flex justify-between max-w-screen-xl mx-auto px-2 xs:px-0 py-3">
        <div className="flex space-x-5">
          <div className="text-2xl mt-1">
            <Link href="/">
              <a>WILE GAME</a>
            </Link>
          </div>
          <div className="text-1xl mt-2">
            <Link href="/">
              <a className="hover:bg-gray-600 px-4 py-2 duration-300 rounded-md">PLAY GAME</a>
            </Link>
          </div>
          <div className="text-1xl mt-2">
            <Link href="/marketplace">
              <a className="hover:bg-gray-600 px-4 py-2 duration-300 rounded-md">MARKETPLACE</a>
            </Link>
          </div>
          <div className="text-1xl mt-2">
            <Link href="/upload">
              <a className="hover:bg-gray-600 px-4 py-2 duration-300 rounded-md">MINT NFT</a>
            </Link>
          </div>
        </div>
        <div className="test">
          {auth ? (
            <button className="text-black bg-white px-3 py-2 rounded-md">
              {`${auth.slice(0, 2)}...${auth.slice(
                auth.length - 4,
                auth.length
              )}`}
            </button>
          ) : (
            <button
              onClick={init}
              className="text-black bg-white px-3 py-2 rounded-md"
            >
              Login with Metamask
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
