import type { FastifyInstance } from "fastify"
import { findMatchById, getAllMatches } from "../controller/match.controller"

export async function matchRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllMatches)
  fastify.get("/:id", { preHandler: fastify.authenticate }, findMatchById)
}
