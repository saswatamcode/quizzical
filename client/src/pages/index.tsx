import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import { Link } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = () => {
  const { data } = usePostsQuery();
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
