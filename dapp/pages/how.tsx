import Layout from "@/components/Layout";
import Link from "next/link";
import HoverText from "@/components/HoverText";
import Input from "@/components/form/Input";

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
        <HoverText descriptiontext="Click play to menu"
        imagdescription="/images/start.png" 
   
      />
        <HoverText descriptiontext="Click find macth To find openent"
        imagdescription="/images/find.png" 
   
      />
     <HoverText descriptiontext="choose one box to random number"
        imagdescription="/images/randombox.png" 
   
      /><HoverText descriptiontext="Click deck to draw a card point"
      imagdescription="/images/main1.png" 
 
    /><HoverText descriptiontext="Click icon sword or sheild to lockpoint"
    imagdescription="/images/lock card.png" 

  />
 <HoverText descriptiontext="Put card effect on board to use effect card"
    imagdescription="/images/main3.png" 

  />
  
  <HoverText descriptiontext=" When you or openent Hp 0 Game is over"
    imagdescription="/images/win.png" 

  />
     
       
      </div>
    </Layout>
  );
};

export default How;
