import Layout from "@/components/Layout";
import Link from "next/link";

const How = () => {
  return (
    <Layout>
      <div className="w-full overflow-y-hidden relative">
        <h1 className="text-center text-4xl font-medium mb-5">HOW TO PLAY</h1>
      </div>

      <div className="flex-auto border-t-2 transition duration-500 ease-in-out  border-gray-300"></div>

      <div className="mt-5 text-2xl  text-red-700 text-center">
        **Important** You would have to account in the MetaMask to start playing
        the game
      </div>
      <div className=" flex flex-col items-center  ">
        <div className="p-3 mt-5 m-5 ">
          <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
            <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
              <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
                <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
                  Click play to menu .
                </h1>
              </div>
            </div>
            <img className="object-cover  " src="/images/start.png" alt="" />
          </div>
        </div>

        <div className="p-3  m-5 ">
          <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
            <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
              <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
                <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
                  Click find macth To find openent .
                </h1>
              </div>
            </div>
            <img className="object-cover  " src="/images/find.png" alt="" />
          </div>
        </div>
        <div className="p-3  m-5 ">
          <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
            <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
              <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
                <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
                  choose one box to random number .
                </h1>
              </div>
            </div>
            <img
              className="object-cover  "
              src="/images/randombox.png"
              alt=""
            />
          </div>
        </div>
        <div className="p-3  m-5 ">
          <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
            <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
              <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
                <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
                  Click deck to draw a card point
                </h1>
              </div>
            </div>
            <img
              className="object-cover  "
              src="/images/main1.png"
              alt=""
            />
          </div>
        </div>
        <div className="p-3  m-5 ">
          <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
            <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
              <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
                <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
                  Click icon sword or sheild to lockpoint
                </h1>
              </div>
            </div>
            <img
              className="object-cover  "
              src="/images/lock card.png"
              alt=""
            />
          </div>
        </div>
        <div className="p-3  m-5 ">
          <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
            <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
              <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
                <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
                  Put card effect on board to use effect card
                </h1>
              </div>
            </div>
            <img
              className="object-cover  "
              src="/images/main3.png"
              alt=""
            />
          </div>
        </div>
        <div className="p-3  m-5 ">
          <div className="w-full  max-w-xl h-full rounded-lg shadow-2xl overflow-hidden relative     ">
            <div className="flex group h-full items-center justify-center absolute z-50 w-full  inset-0 top-0 ">
              <div className="relative group flex justify-center w-1/2 h-0 bg-center bg-cover  shadow-lg pb-1-2 rounded-xl bg-image">
                <h1 className="absolute p-6 text-2xl tracking-widest text-white  transition-opacity transform -translate-y-1/2 bg-black bg-opacity-75 opacity-0 top-1/2 rounded-xl group-hover:opacity-100   ">
                  When you or openent Hp 0 Game is over
                </h1>
              </div>
            </div>
            <img
              className="object-cover  "
              src="/images/win.png"
              alt=""
            />
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default How;
