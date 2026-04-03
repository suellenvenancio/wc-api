import { FastifyInstance } from "fastify"
import { createUser, findUserById, me } from "../controller/user.controller"
import { validateData } from "../middleware/validation"
import { registerSchema } from "../schemas"
import { RegisterBody } from "../types.ts"

export function userRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: RegisterBody }>(
    "/",
    { preHandler: validateData(registerSchema) },
    createUser,
  )
  fastify.get("/:id", { preHandler: fastify.authenticate }, findUserById)
  fastify.get(
    "/me",
    { preHandler: fastify.authenticate }, 
    me
  )
}
