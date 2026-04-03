import type { FastifyInstance } from "fastify"
import { findGroupById, getAllGroups } from "../controller/group.controller"

export async function groupRoutes(fastify: FastifyInstance) {
  fastify.get("/", { preHandler: fastify.authenticate }, getAllGroups)
  fastify.get("/:id", { preHandler: fastify.authenticate }, findGroupById)
}
