import type { FastifyReply, FastifyRequest } from "fastify"
import tournamentService from "../service/championship.service"

export async function createTournament(
  request: FastifyRequest<{ Body: { name: string; year: number } }>,
  reply: FastifyReply,
) {
  try {
    const { name, year } = request.body
    const tournament = await tournamentService.createTournament({
      name,
      year,
    })
    return reply.status(201).send({ data: tournament })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getAllTournaments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const tournaments = await tournamentService.getAllTournaments()
    return reply.status(200).send({ tournaments })
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findTournamentById(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params
    const tournament = await tournamentService.findTournamentById(id)
    return reply.status(200).send(tournament)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
