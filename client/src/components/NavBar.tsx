import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import {
  useMeQuery,
  useLogoutMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const { loading, error, data } = useMeQuery({
    skip: isServer(),
  });
  const [logout, { loading: logoutfetching }] = useLogoutMutation();

  let body = null;
  if (loading) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={() =>
            logout({
              update: (store) => {
                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me: null,
                  },
                });
              },
            })
          }
          isLoading={logoutfetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="Teal" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
