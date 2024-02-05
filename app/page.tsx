import Head from "next/head";
import NewsFeed from "./ui/NewsFeed";
import ProductList from "./ui/ProductList";
const Home: React.FC = () => {
  return (
    <main>
      <div className=" flex flex-col items-center ">
        {/* <NewsFeed /> */}
        <ProductList />
      </div>
    </main>
  );
};

export default Home;
