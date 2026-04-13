import tournamentRepository from "../repository/tournament.repository"

async function createTournament({
  name,
  year,
}: {
  name: string
  year: number
}) {
  try {
    return await tournamentRepository.createTournament({ name, year })
  } catch (error) {
    console.error("Error creating tournament:", error)
    throw new Error("Failed to create tournament")
  }
}

async function getAllTournaments() {
  try {
    return await tournamentRepository.getAllTournaments()
  } catch (error) {
    console.error("Error fetching tournaments:", error)
    throw new Error("Failed to fetch tournaments")
  }
}

async function findTournamentById(id: number) {
  try {
    return await tournamentRepository.findTournamentById(id)
  } catch (error) {
    console.error(`Error fetching tournament with id ${id}:`, error)
    throw new Error("Failed to fetch tournament")
  }
}

const tournamentService = {
  createTournament,
  getAllTournaments,
  findTournamentById,
}

export default tournamentService
