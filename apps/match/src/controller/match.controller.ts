import type { FastifyReply, FastifyRequest } from "fastify"
import matchService from "../service/match.service"

export async function createMatch(
  request: FastifyRequest<{
    Body: {
      matchDate: Date
      homeScore: number
      awayScore: number
      championshipId: number
      stadiumId: number
      homeTeamId: number
      awayTeamId: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      matchDate,
      homeScore,
      awayScore,
      championshipId,
      stadiumId,
      homeTeamId,
      awayTeamId,
    } = request.body
    const match = await matchService.createMatch({
      matchDate,
      homeScore,
      awayScore,
      championshipId,
      stadiumId,
      homeTeamId,
      awayTeamId,
    })
    return reply.status(201).send(match)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getAllMatches(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const matches = await matchService.getAllMatches()
    return reply.status(200).send(matches)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findMatchById(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params
    const match = await matchService.findMatchById(id)
    return reply.status(200).send(match)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findMatchByChampionshipId(
  request: FastifyRequest<{ Params: { championshipId: number } }>,
  reply: FastifyReply,
) {
  try {
    const { championshipId } = request.params
    const match = await matchService.findMatchByChampionshipId(championshipId)
    return reply.status(200).send(match)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findMatchByStadiumId(
  request: FastifyRequest<{ Params: { stadiumId: number } }>,
  reply: FastifyReply,
) {
  try {
    const { stadiumId } = request.params
    const match = await matchService.findMatchByStadiumId(stadiumId)
    return reply.status(200).send(match)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findMatchByHomeTeamId(
  request: FastifyRequest<{ Params: { homeTeamId: number } }>,
  reply: FastifyReply,
) {
  try {
    const { homeTeamId } = request.params
    const match = await matchService.findMatchByHomeTeamId(homeTeamId)
    return reply.status(200).send(match)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findMatchByAwayTeamId(
  request: FastifyRequest<{ Params: { awayTeamId: number } }>,
  reply: FastifyReply,
) {
  try {
    const { awayTeamId } = request.params
    const match = await matchService.findMatchByAwayTeamId(awayTeamId)
    return reply.status(200).send(match)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
