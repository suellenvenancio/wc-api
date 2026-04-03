import type { FastifyInstance } from "fastify"
import { getAllTeams, getTeamById } from "../controller/team.controller"

export async function teamRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllTeams)
  fastify.get("/:id", { preHandler: fastify.authenticate }, getTeamById)
}
