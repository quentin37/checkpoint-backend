import "reflect-metadata";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { AppDataSource } from "./data-source";
import { WorldResolver } from "./resolvers/world";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import * as dotenv from "dotenv";

dotenv.config();

const port = 5001;
const start = async (): Promise<void> => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WorldResolver],
  });

  const server = new ApolloServer({
    cache: new InMemoryLRUCache(),
    schema,
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.error(`Server is ready at ${url}`);
  } catch (err) {
    console.error("Error starting the server");
  }
};

void start();
