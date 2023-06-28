import { type NextPage } from "next";
import { AllPostings } from "~/components/AllPostings";
import { NewListing } from "~/components/NewListing";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold"> Home </h1>
      </header>
      <NewListing />
      <RecentPostings />
    </>
  );
};

function RecentPostings() {
  const posts = api.post.allPostsFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <AllPostings 
      posts={posts.data?.pages.flatMap((page) => page.posts)}
      isError = {posts.isError}
      isLoading = {posts.isLoading}
      hasMore = {posts.hasNextPage }
      fetchNewPosts = {posts.fetchNextPage}

    />
  );
}

export default Home;
