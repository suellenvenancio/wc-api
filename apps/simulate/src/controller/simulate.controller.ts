import type { FastifyReply, FastifyRequest } from "fastify"
import simulateService from "../service/simulate.service"

export async function simulateMatch(
  request: FastifyRequest<{
    Body: {
      promptName: string
      homeTeam: string
      awayTeam: string
      homeTeamPlayers: string[]
      awayTeamPlayers: string[]
      tacticHomeTeam: string
      tacticAwayTeam: string
      matchId: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      promptName,
      homeTeam,
      awayTeam,
      homeTeamPlayers,
      awayTeamPlayers,
      tacticHomeTeam,
      tacticAwayTeam,
      matchId,
    } = request.body
    const response = await simulateService.simulateMatchPrompt(
      promptName,
      homeTeam,
      awayTeam,
      homeTeamPlayers,
      awayTeamPlayers,
      tacticHomeTeam,
      tacticAwayTeam,
      matchId,
    )
    reply.status(200).send(response)
  } catch (error) {
    console.log(error)
    reply.status(500).send({ error: "Erro ao processar prompt" })
  }
}

export async function simulateDefaultTeam(
  request: FastifyRequest<{
    Body: {
      promptName: string
      tactic: string
      teamName: string
      teamPlayers: string[]
      userLineupId: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const { promptName, tactic, teamName, teamPlayers, userLineupId } =
      request.body
    const response = await simulateService.simulateDefaultTeamPrompt(
      promptName,
      tactic,
      teamName,
      teamPlayers,
      userLineupId,
    )
    reply.status(200).send(response)
  } catch (error) {
    console.log(error)
    reply.status(500).send({ error: "Erro ao processar prompt" })
  }
}
