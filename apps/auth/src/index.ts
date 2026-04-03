import fCookie from "@fastify/cookie"
import cors from "@fastify/cors"
import { default as fjwt } from "@fastify/jwt"
import dotenv from "dotenv"
import type { FastifyReply, FastifyRequest } from "fastify"
import fastify from "fastify"
import { authRoutes } from "./routes/auth.routes"
import { userRoutes } from "./routes/user.routes"

dotenv.config()

const app = fastify()

app.register(cors, {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
})
app.register(fjwt, { secret: process.env.JWT_SECRET || "some-secret-key" })

app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt
  return next()
})

app.register(fCookie, {
  secret: process.env.COOKIE_SECRET || "some-cookie-secret-key",
  hook: "preHandler",
})

app.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token

    if (!token) {
      return reply.status(401).send({ message: "Authentication required" })
    }

    const decoded = req.jwt.verify(token)
    req.user = decoded
  },
)

app.register(authRoutes, { prefix: "/auth" })
app.register(userRoutes, { prefix: "/users" })

export default app
