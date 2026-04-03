import type { FastifyReply, FastifyRequest } from "fastify"
import coachService from "../service/coach.service"

export async function createCoach(
  request: FastifyRequest<{
    Body: { name: string; teamId: number; preferredFormation: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { name, teamId, preferredFormation } = request.body
    const coach = await coachService.createCoach({
      name,
      teamId,
      preferredFormation,
    })
    return reply.status(201).send(coach)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getAllCoaches(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const coaches = await coachService.getAllCoaches()
    return reply.status(200).send(coaches)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findCoachById(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params
    const coach = await coachService.findCoachById(id)
    return reply.status(200).send(coach)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findCoachByTeamId(
  request: FastifyRequest<{ Params: { teamId: number } }>,
  reply: FastifyReply,
) {
  try {
    const { teamId } = request.params
    const coach = await coachService.findCoachByTeamId(teamId)
    return reply.status(200).send(coach)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
