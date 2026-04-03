import type { FastifyInstance } from "fastify"
import { findPlayerById, getAllPlayers } from "../controller/player.controller"

export async function playerRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllPlayers)
  fastify.get("/:id", { preHandler: fastify.authenticate }, findPlayerById)
}
