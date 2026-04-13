import type { FastifyInstance } from "fastify"
import {
  findGroupById,
  findGroupByTournamentId,
  getAllGroups,
} from "../controller/group.controller"

export async function groupRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllGroups)
  fastify.get("/:id", { preHandler: fastify.authenticate }, findGroupById)
  fastify.get(
    "/tournament/:tournamentId",
    { preHandler: fastify.authenticate },
    findGroupByTournamentId,
  )
}
