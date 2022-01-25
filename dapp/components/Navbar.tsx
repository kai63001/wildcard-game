import { init, isAuth } from "@/lib/Web3Client";
import { useEffect, useState } from "react";
// import { isAuth } from "@/lib/JWT";
// import { Cookies } from "react-cookie";
// const cookies = new Cookies();

const Navbar = () => {
  const [auth, setAuth] = useState("");
  useEffect(() => {
    getAuth();
  });

  const getAuth = async () => {
    try {
      init().then( async(data)=>{
        setAuth(await isAuth());
      })
      
    } catch (error) {
      console.log("login first");
    }
  };

  return (
    <nav className="bg-black text-white">
      <div className="flex justify-between max-w-screen-xl mx-auto px-2 xs:px-0 py-3">
        <div className="text-2xl mt-1">WILE GAME</div>
        <div className="test">
          {auth ? (
            <button
              className="text-black bg-white px-3 py-2 rounded-md"
            >
              {auth}
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
