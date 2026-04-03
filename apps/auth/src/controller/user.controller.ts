import type { FastifyReply, FastifyRequest } from "fastify"
import userService from "../service/user.service.js"
import type { RegisterBody } from "../types.ts"

export async function createUser(
  req: FastifyRequest<{
    Body: RegisterBody
  }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      reply.status(400).send({ error: "Name, email and password are required" })
      return
    }

    const user = await userService.createUser(name, email, password)
    await reply.status(201).send({
      name: user.name,
      email: user.email,
      id: user.id,
      createdAt: user.createdAt,
    })
  } catch (error) {
    reply.status(500).send({ error: "Failed to create user" })
  }
}

export async function findUserById(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const { id } = req.params

    if (!id) {
      reply.status(400).send({ error: "User ID is required" })
      return
    }

    const user = await userService.findUserById(id)

    reply.status(200).send(user)
  } catch (error) {
    reply.status(500).send({ error: "Failed to get user" })
  }
}

interface UserPayload {
  sub: {
    id: string
    email: string
    name: string
    iat: IdleDeadline
  }
  email: string
}

export async function me(
  req: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const user = req.user as UserPayload["sub"]
    if (!user) {
      reply.status(400).send({ error: "User ID is required" })
      return
    }

    reply.status(200).send({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } catch (error) {
    reply.status(500).send({ error: "Failed to get user" })
  }
}
