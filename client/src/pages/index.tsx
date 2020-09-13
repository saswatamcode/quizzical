import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import { Box, Flex, Heading, Link, Stack, Text, Button } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = () => {
  const { data, loading } = usePostsQuery({
    variables: { limit: 10 },
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
          data!.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))
        )}
      </Stack>
      {data ? (
        <Flex>
          <Button isLoading={loading} m={4} my={8}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
