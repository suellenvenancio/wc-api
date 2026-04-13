import groupRepository from "../repository/group.repository"
import tournamentRepository from "../repository/tournament.repository"

async function createGroup({
  name,
  tournamentId,
}: {
  name: string
  tournamentId: number
}) {
  try {
    const tournament =
      await tournamentRepository.findTournamentById(tournamentId)
    if (!tournament) {
      throw new Error("Tournament not found")
    }
    return await groupRepository.createGroup({ name, tournamentId })
  } catch (error) {
    console.error("Error creating group:", error)
    throw new Error("Failed to create group")
  }
}

async function getAllGroups() {
  try {
    return await groupRepository.getAllGroups()
  } catch (error) {
    console.error("Error fetching groups:", error)
    throw new Error("Failed to fetch groups")
  }
}

async function findGroupById(id: number) {
  try {
    return await groupRepository.findGroupById(id)
  } catch (error) {
    console.error(`Error fetching group with id ${id}:`, error)
    throw new Error("Failed to fetch group")
  }
}

async function findGroupByTournamentId(tournamentId: number) {
  try {
    return await groupRepository.findGroupByTournamentId(tournamentId)
  } catch (error) {
    console.error(
      `Error fetching groups for tournament id ${tournamentId}:`,
      error,
    )
    throw new Error("Failed to fetch groups")
  }
}

const groupService = {
  createGroup,
  getAllGroups,
  findGroupById,
  findGroupByTournamentId,
}

export default groupService
