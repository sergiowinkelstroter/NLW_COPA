import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { poolRoutes } from "./routes/pool";
import { usersRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: process.env.SECRET_TOKEN as string,
  });

  await fastify.register(poolRoutes);

  await fastify.register(usersRoutes);

  await fastify.register(guessRoutes);

  await fastify.register(authRoutes);

  await fastify.register(gameRoutes);

  await fastify.listen({ port: 3000, host: "0.0.0.0" });
}

bootstrap();
