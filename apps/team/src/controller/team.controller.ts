import type { FastifyReply, FastifyRequest } from "fastify"
import teamService from "../service/team.service"

export async function createTeam(
  request: FastifyRequest<{
    Body: { name: string; coachId: number; stadiumId: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { name } = request.body
    const team = await teamService.createTeam({ name })
    return reply.status(201).send(team)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getAllTeams(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const teams = await teamService.getAllTeams()
    return reply.status(200).send(teams)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getTeamById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params
    const team = await teamService.findTeamById(Number(id))
    return reply.status(200).send(team)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findTeamsByGroupId(
  request: FastifyRequest<{ Params: { groupId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { groupId } = request.params
    const teams = await teamService.findTeamsByGroupId(Number(groupId))
    return reply.status(200).send(teams)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findTeamByTournamentId(
  request: FastifyRequest<{ Params: { tournamentId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { tournamentId } = request.params
    const teams = await teamService.findTeamsByTournamentId(
      Number(tournamentId),
    )
    return reply.status(200).send(teams)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
