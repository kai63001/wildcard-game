import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout noFull>
      <div className="text-center w-full flex overflow-y-hidden relative">
        <img
          className="m-auto h-screen w-full object-cover overflow-y-hidden"
          src="/images/bg.jpg"
          alt=""
        />
        <img
          src="https://cdn.discordapp.com/attachments/503940441113362435/942360880862097458/unknown.png"
          alt=""
          width="800px"
          className="absolute right-0 bottom-9"
        />
      </div>
    </Layout>
  );
};

export default Home;
