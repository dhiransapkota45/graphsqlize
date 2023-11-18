// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./graphql/typedef.js";
import { resolvers } from "./graphql/resolver.js";
import jwt from "jsonwebtoken";

import "./db/connection.js";
import { user } from "../models/user.js";

const tokensecret: string = "secretkey";

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      try {
        if (req?.headers?.token) {
          const token = req.headers.token;
          const decoded = jwt.verify(token.toString(), tokensecret) as {
            id: string;
            userName: string;
          };

          const isUserExist = await user.findOne({
            where: { id: decoded.id },
          });

          if (!isUserExist) throw new Error("User not found");

          return { user: isUserExist };
        } else {
          return { user: null };
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
