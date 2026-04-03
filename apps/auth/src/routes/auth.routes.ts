import type { FastifyInstance } from "fastify"
import { login, logout } from "../controller/auth.controller"
import { validateData } from "../middleware/validation"
import { loginSchema } from "../schemas"
import type { LoginBody } from "../types.ts"

export function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: LoginBody }>(
    "/login",
    { preHandler: validateData(loginSchema) },
    login,
  )
  fastify.post("/logout", { preHandler: fastify.authenticate }, logout)
}
