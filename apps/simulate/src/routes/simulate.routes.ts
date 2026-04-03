import type { FastifyInstance } from "fastify"
import {
  simulateDefaultTeam,
  simulateMatch,
} from "../controller/simulate.controller"

export async function simulateRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/match",
    { preHandler: fastify.authenticate },
    simulateMatch,
  )
  fastify.post(
    "/team",
    { preHandler: fastify.authenticate },
    simulateDefaultTeam,
  )
}
