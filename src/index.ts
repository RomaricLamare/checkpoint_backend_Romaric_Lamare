import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import datasource from "./lib/datasource";
import cors from "cors";
import CountriesResolver from "./Resolvers/countries.resolver";
import { Continent } from "./Entities/Continent.entity";
import ContinentResolver from "./Resolvers/continents.resolver";

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [CountriesResolver, ContinentResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await datasource.initialize();
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {})
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
