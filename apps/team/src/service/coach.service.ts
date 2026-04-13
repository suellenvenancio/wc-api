import coachRepository from "../repository/coach.repository"
import teamRepository from "../repository/team.repository"

async function createCoach({
  name,
  teamId,
  preferredFormation,
}: {
  name: string
  teamId: number
  preferredFormation: string
}) {
  try {
    const team = await teamRepository.findTeamById(teamId)
    if (!team) {
      throw new Error("Team not found")
    }

    return await coachRepository.createCoach({
      name,
      teamId,
      preferredFormation,
    })
  } catch (error) {
    console.error("Error creating coach:", error)
    throw new Error("Failed to create coach")
  }
}

async function getAllCoaches() {
  try {
    return await coachRepository.getAllCoaches()
  } catch (error) {
    console.error("Error fetching coaches:", error)
    throw new Error("Failed to fetch coaches")
  }
}

async function findCoachById(id: number) {
  try {
    return await coachRepository.findCoachById(id)
  } catch (error) {
    console.error(`Error fetching coach with id ${id}:`, error)
    throw new Error("Failed to fetch coach")
  }
}

async function findCoachByTeamId(teamId: number) {
  try {
    return await coachRepository.findCoachByTeamId(teamId)
  } catch (error) {
    console.error(`Error fetching coach for team id ${teamId}:`, error)
    throw new Error("Failed to fetch coach")
  }
}

const coachService = {
  createCoach,
  getAllCoaches,
  findCoachById,
  findCoachByTeamId,
}

export default coachService
