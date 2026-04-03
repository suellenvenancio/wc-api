import type { FastifyInstance } from "fastify"
import {
  findTournamentById,
  getAllTournaments,
} from "../controller/tournament.controller"

export async function tournamentRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllTournaments)
  fastify.get("/:id", { preHandler: fastify.authenticate }, findTournamentById)
}
