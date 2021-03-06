import { usePostsQuery, PostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import { Box, Flex, Heading, Link, Stack, Text, Button } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = () => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: { limit: 10, cursor: null },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return <div>you got query failed</div>;
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>Quizzical</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      <br />
      <Stack spacing={8}>
        {!data && loading ? (
          <div>loading...</div>
        ) : (
          data!.posts.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))
        )}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
                updateQuery: (
                  previousValue,
                  { fetchMoreResult }
                ): PostsQuery => {
                  if (!fetchMoreResult) {
                    return previousValue as PostsQuery;
                  }

                  return {
                    __typename: "Query",
                    posts: {
                      __typename: "PaginatedPosts",
                      hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
                      posts: [
                        ...(previousValue as PostsQuery).posts.posts,
                        ...(fetchMoreResult as PostsQuery).posts.posts,
                      ],
                    },
                  };
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
