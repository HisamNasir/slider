import Head from "next/head";
import NewsFeed from "./ui/NewsFeed";
const Home: React.FC = () => {
  return (
    <main>
      <div className=" flex flex-col items-center ">
        <NewsFeed />
      </div>
    </main>
  );
};

export default Home;
