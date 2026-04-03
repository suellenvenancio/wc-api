import type { FastifyReply, FastifyRequest } from "fastify"
import playerService from "../service/player.service"

export async function createPlayer(
  request: FastifyRequest<{
    Body: {
      name: string
      teamId: number
      position: string
      overallRating: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const { name, teamId, position, overallRating } = request.body
    const player = await playerService.createPlayer({
      name,
      teamId,
      position,
      overallRating,
    })
    return reply.status(201).send(player)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getAllPlayers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const players = await playerService.getAllPlayers()
    return reply.status(200).send(players)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findPlayerById(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params
    const player = await playerService.findPlayerById(id)
    return reply.status(200).send(player)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
