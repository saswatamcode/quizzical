import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { errors } = await createPost({ variables: { input: values } });
          if (errors) {
            console.log(errors)
            router.push("/login");
          }
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
