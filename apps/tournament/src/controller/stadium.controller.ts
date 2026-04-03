import type { FastifyReply, FastifyRequest } from "fastify"
import stadiumService from "../service/stadium.service"

export async function createStadium(
  request: FastifyRequest<{
    Body: { name: string; capacity: number; city: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { name, capacity, city } = request.body
    const stadium = await stadiumService.createStadium({ name, capacity, city })
    return reply.status(201).send(stadium)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getAllStadiums(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const stadiums = await stadiumService.getAllStadiums()
    return reply.status(200).send(stadiums)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
