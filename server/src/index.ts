import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
//import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  //   const post = orm.em.create(Post, { title: "my first post" });
  //   await orm.em.persistAndFlush(post);
  //   const posts = await orm.em.find(Post, {});
  //   console.log(posts);
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
      validate: false,
    }),
  });

  app.listen(4000, () => {
    console.log("server running @ port 4000");
  });
};

main().catch((err) => console.log(err));
