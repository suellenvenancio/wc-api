import matchRepository from "../repository/match.repository"

async function createMatch({
  matchDate,
  homeScore,
  awayScore,
  championshipId,
  stadiumId,
  homeTeamId,
  awayTeamId,
}: {
  matchDate: Date
  homeScore: number
  awayScore: number
  championshipId: number
  stadiumId: number
  homeTeamId: number
  awayTeamId: number
}) {
  try {
    return await matchRepository.createMatch({
      matchDate,
      homeScore,
      awayScore,
      championshipId,
      stadiumId,
      homeTeamId,
      awayTeamId,
    })
  } catch (error) {
    console.error("Error creating match:", error)
    throw new Error("Failed to create match")
  }
}

async function getAllMatches() {
  try {
    return await matchRepository.getAllMatches()
  } catch (error) {
    console.error("Error fetching matches:", error)
    throw new Error("Failed to fetch matches")
  }
}

async function findMatchById(id: number) {
  try {
    return await matchRepository.findMatchById(id)
  } catch (error) {
    console.error(`Error fetching match with id ${id}:`, error)
    throw new Error("Failed to fetch match")
  }
}

async function findMatchByChampionshipId(championshipId: number) {
  try {
    return await matchRepository.findMatchByChampionshipId(championshipId)
  } catch (error) {
    console.error(
      `Error fetching matches for championship id ${championshipId}:`,
      error,
    )
    throw new Error("Failed to fetch matches")
  }
}

async function findMatchByStadiumId(stadiumId: number) {
  try {
    return await matchRepository.findMatchByStadiumId(stadiumId)
  } catch (error) {
    console.error(`Error fetching matches for stadium id ${stadiumId}:`, error)
    throw new Error("Failed to fetch matches")
  }
}

async function findMatchByHomeTeamId(homeTeamId: number) {
  try {
    return await matchRepository.findMatchByHomeTeamId(homeTeamId)
  } catch (error) {
    console.error(
      `Error fetching matches for home team id ${homeTeamId}:`,
      error,
    )
    throw new Error("Failed to fetch matches")
  }
}

async function findMatchByAwayTeamId(awayTeamId: number) {
  try {
    return await matchRepository.findMatchByAwayTeamId(awayTeamId)
  } catch (error) {
    console.error(
      `Error fetching matches for away team id ${awayTeamId}:`,
      error,
    )
    throw new Error("Failed to fetch matches")
  }
}

const matchService = {
  createMatch,
  getAllMatches,
  findMatchById,
  findMatchByChampionshipId,
  findMatchByStadiumId,
  findMatchByHomeTeamId,
  findMatchByAwayTeamId,
}

export default matchService
