import type { FastifyInstance } from "fastify"
import {
  findTeamByTournamentId,
  findTeamsByGroupId,
  getAllTeams,
  getTeamById,
} from "../controller/team.controller"

export async function teamRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllTeams)
  fastify.get("/:id", { preHandler: fastify.authenticate }, getTeamById)
  fastify.get(
    "/tournament/:tournamentId",
    { preHandler: fastify.authenticate },
    findTeamByTournamentId,
  )
  fastify.get(
    "/group/:groupId",
    { preHandler: fastify.authenticate },
    findTeamsByGroupId,
  )
}
