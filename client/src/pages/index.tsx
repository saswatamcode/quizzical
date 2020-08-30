import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data } = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </>
  );
};

export default withApollo({ ssr: true })(Index);
