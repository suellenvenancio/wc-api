import type { FastifyInstance } from "fastify"
import {
  findMatchByAwayTeamId,
  findMatchByTournamentId,
  findMatchByHomeTeamId,
  findMatchById,
  findMatchByGroupId,
  findMatchByStadiumId,
  getAllMatches,
} from "../controller/match.controller"

export async function matchRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllMatches)
  fastify.get("/:id", { preHandler: fastify.authenticate }, findMatchById)
  fastify.get(
    "/tournament/:tournamentId",
    { preHandler: fastify.authenticate },
    findMatchByTournamentId,
  )
  fastify.get(
    "/stadium/:stadiumId",
    { preHandler: fastify.authenticate },
    findMatchByStadiumId,
  )
  fastify.get(
    "/homeTeam/:homeTeamId",
    { preHandler: fastify.authenticate },
    findMatchByHomeTeamId,
  )
  fastify.get(
    "/awayTeam/:awayTeamId",
    { preHandler: fastify.authenticate },
    findMatchByAwayTeamId,
  )
  fastify.get(
    "/group/:groupId",
    { preHandler: fastify.authenticate },
    findMatchByGroupId,
  ) 
}
