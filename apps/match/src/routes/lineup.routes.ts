import type { FastifyInstance } from "fastify"
import {
  createOrUpdateMatchLineup,
  findDefaultLineupByTeamAndUser,
  upsertDefaultLineupByTeam,
} from "../controller/lineup.controller"
import { validateData } from "../middleware/validation"
import { createLineupSchema, defaultLineupSchema } from "../schemas"
import type { CreateLineupBody, DefaultLineupBody } from "../types.ts"

export function lineupRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateLineupBody }>(
    "/match",
    { preHandler: [validateData(createLineupSchema), fastify.authenticate] },
    createOrUpdateMatchLineup,
  )
  fastify.post<{ Body: DefaultLineupBody }>(
    "/default",
    { preHandler: [validateData(defaultLineupSchema), fastify.authenticate] },
    upsertDefaultLineupByTeam,
  )
  fastify.get("/user/:userId/team/:teamId", findDefaultLineupByTeamAndUser)
}
