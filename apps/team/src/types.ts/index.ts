import z from "zod"
import type {
  createLineupSchema,
  defaultLineupSchema,
  loginSchema,
  registerSchema,
} from "../schemas"

type NewType = typeof createLineupSchema

export type CreateLineupBody = z.infer<NewType>
export type DefaultLineupBody = z.infer<typeof defaultLineupSchema>
export type LoginBody = z.infer<typeof loginSchema>
export type RegisterBody = z.infer<typeof registerSchema>

import { JWT } from "@fastify/jwt"

declare module "fastify" {
  interface FastifyJWT {
    payload: { sub: string; email: string }
    user: {
      sub: string
      email: string
    }
  }
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any
  }
}
