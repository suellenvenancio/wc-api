import type { FastifyInstance } from "fastify"
import { getAllStadiums } from "../controller/stadium.controller"

export async function stadiumRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllStadiums)
}
