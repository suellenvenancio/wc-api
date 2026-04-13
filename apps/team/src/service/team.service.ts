import tournamentGrpc from "../grpc/grpc-client/tournament.grpc"
import teamRepository from "../repository/team.repository"

async function createTeam({ name }: { name: string }) {
  try {
    return await teamRepository.createTeam({ name })
  } catch (error) {
    console.error("Error creating team:", error)
    throw new Error("Failed to create team")
  }
}

async function getAllTeams() {
  try {
    return await teamRepository.getAllTeams()
  } catch (error) {
    console.error("Error fetching teams:", error)
    throw new Error("Failed to fetch teams")
  }
}

async function findTeamById(id: number) {
  try {
    return await teamRepository.findTeamById(id)
  } catch (error) {
    console.error(`Error fetching team with id ${id}:`, error)
    throw new Error("Failed to fetch team")
  }
}

async function findTeamsByGroupId(groupId: number) {
  try {
    const group = await tournamentGrpc.findGroupById(groupId)
    if (!group) {
      throw new Error("Group not found")
    }

    return await teamRepository.findTeamsByGroupId(groupId)
  } catch (error) {
    console.error(`Error fetching teams for group id ${groupId}:`, error)
    throw new Error("Failed to fetch teams")
  }
}

async function findTeamsByTournamentId(tournamentId: number) {
  try {
    const tournament = await tournamentGrpc.findTournamentById(tournamentId)
    if (!tournament) {
      throw new Error("Tournament not found")
    }

    return await teamRepository.findTeamsByTournamentId(tournamentId)
  } catch (error) {
    console.error(
      `Error fetching teams for tournament id ${tournamentId}:`,
      error,
    )
    throw new Error("Failed to fetch teams")
  }
}

const teamService = {
  createTeam,
  getAllTeams,
  findTeamById,
  findTeamsByGroupId,
  findTeamsByTournamentId,
}

export default teamService
