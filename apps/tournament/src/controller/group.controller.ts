import type { FastifyReply, FastifyRequest } from "fastify"
import groupService from "../service/group.service"

export async function createGroup(
  request: FastifyRequest<{ Body: { name: string; championshipId: number } }>,
  reply: FastifyReply,
) {
  try {
    const { name, championshipId } = request.body
    const group = await groupService.createGroup({ name, championshipId })
    return reply.status(201).send(group)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function getAllGroups(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const groups = await groupService.getAllGroups()
    return reply.status(200).send(groups)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findGroupById(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params
    const group = await groupService.findGroupById(id)
    return reply.status(200).send(group)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function findGroupByChampionshipId(
  request: FastifyRequest<{ Params: { championshipId: number } }>,
  reply: FastifyReply,
) {
  try {
    const { championshipId } = request.params
    const group = await groupService.findGroupByChampionshipId(championshipId)
    return reply.status(200).send(group)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}
