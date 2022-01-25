import {init} from "@/lib/Web3Client"

const Navbar = () => {
  return (
    <nav className="bg-black text-white">
      <div className="flex justify-between max-w-screen-xl mx-auto px-2 xs:px-0 py-3">
        <div className="text-2xl mt-1">WILE GAME</div>
        <div className="test">
          <button onClick={init} className="text-black bg-white px-3 py-2 rounded-md">
            Login with Metamask
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
