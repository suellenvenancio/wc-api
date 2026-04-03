import type { FastifyReply, FastifyRequest } from "fastify"
import lineupService from "../service/lineup.service"
import type { CreateLineupBody, DefaultLineupBody } from "../types.ts"

export async function createOrUpdateMatchLineup(
  request: FastifyRequest<{
    Body: CreateLineupBody
  }>,
  reply: FastifyReply,
) {
  try {
    const { userId, matchId, teamId, formation, players } = request.body
    const lineup = await lineupService.createOrUpdateLineup({
      userId,
      matchId: Number(matchId),
      teamId: Number(teamId),
      formation,
      players,
    })
    return reply.status(200).send(lineup)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function upsertDefaultLineupByTeam(
  request: FastifyRequest<{
    Body: DefaultLineupBody
  }>,
  reply: FastifyReply,
) {
  try {
    const { userId, teamId, formation, players } = request.body
    const lineup = await lineupService.upsertDefaultLineup({
      userId,
      teamId,
      formation,
      players,
    })

    return reply.status(200).send(lineup)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findDefaultLineupByTeamAndUser(
  request: FastifyRequest<{
    Params: { userId: string; teamId: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { userId, teamId } = request.params
    const defaultLineup = await lineupService.findDefaultLineupByTeamAndUser(
      userId,
      Number(teamId),
    )

    return reply.status(200).send(defaultLineup)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
