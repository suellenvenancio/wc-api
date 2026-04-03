import playerRepository from "../repository/player.respository"

export async function createPlayer({
  name,
  teamId,
  position,
  overallRating,
}: {
  name: string
  teamId: number
  position: string
  overallRating: number
}) {
  try {
    return await playerRepository.createPlayer({
      name,
      teamId,
      position,
      overallRating,
    })
  } catch (error) {
    console.error("Error creating player:", error)
    throw new Error("Failed to create player")
  }
}

async function getAllPlayers() {
  try {
    return await playerRepository.getAllPlayers()
  } catch (error) {
    console.error("Error fetching players:", error)
    throw new Error("Failed to fetch players")
  }
}

async function findPlayerById(id: number) {
  try {
    return await playerRepository.findPlayerById(id)
  } catch (error) {
    console.error(`Error fetching player with id ${id}:`, error)
    throw new Error("Failed to fetch player")
  }
}

async function findPlayerByTeamId(teamId: number) {
  try {
    return await playerRepository.findPlayerByTeamId(teamId)
  } catch (error) {
    console.error(`Error fetching players for team id ${teamId}:`, error)
    throw new Error("Failed to fetch players")
  }
}

const playerService = {
  createPlayer,
  getAllPlayers,
  findPlayerById,
  findPlayerByTeamId,
}

export default playerService
