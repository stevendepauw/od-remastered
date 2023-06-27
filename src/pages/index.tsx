import { type NextPage } from "next";
import { NewListing } from "~/components/NewListing";

const Home: NextPage = () => {
  return <>
    <header className="sticky top-0 z-10 border-b bg-white pt-2">
      <h1 className="mb-2 px-4 text-lg font-bold"> Home </h1>
    </header>
    <NewListing />
  </>;
}

export default Home;