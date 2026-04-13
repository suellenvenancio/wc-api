import teamGrpc from "../grpc/grpc-client/team.grpc"
import tournamentGrpc from "../grpc/grpc-client/tournament.grpc"
import matchRepository from "../repository/match.repository"

async function createMatch({
  matchDate,
  homeScore,
  awayScore,
  tournamentId,
  stadiumId,
  homeTeamId,
  awayTeamId,
}: {
  matchDate: Date
  homeScore: number
  awayScore: number
  tournamentId: number
  stadiumId: number
  homeTeamId: number
  awayTeamId: number
}) {
  try {
    const tournament = await tournamentGrpc.findTournamentById(tournamentId)
    if (!tournament) {
      throw new Error("Tournament not found")
    }
    const stadium = await tournamentGrpc.findStadiumById(stadiumId)
    if (!stadium) {
      throw new Error("Stadium not found")
    }
    const homeTeam = await teamGrpc.findTeamById(homeTeamId)
    if (!homeTeam) {
      throw new Error("Home team not found")
    }
    const awayTeam = await teamGrpc.findTeamById(awayTeamId)
    if (!awayTeam) {
      throw new Error("Away team not found")
    }

    return await matchRepository.createMatch({
      matchDate,
      homeScore,
      awayScore,
      tournamentId,
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

async function findMatchByTournamentId(tournamentId: number) {
  try {
    const tournament = await tournamentGrpc.findTournamentById(tournamentId)
    if (!tournament) {
      throw new Error("Tournament not found")
    }
    return await matchRepository.findMatchByTournamentId(tournamentId)
  } catch (error) {
    console.error(
      `Error fetching matches for tournament id ${tournamentId}:`,
      error,
    )
    throw new Error("Failed to fetch matches")
  }
}

async function findMatchByStadiumId(stadiumId: number) {
  try {
    const stadium = await tournamentGrpc.findStadiumById(stadiumId)
    if (!stadium) {
      throw new Error("Stadium not found")
    }
    return await matchRepository.findMatchByStadiumId(stadiumId)
  } catch (error) {
    console.error(`Error fetching matches for stadium id ${stadiumId}:`, error)
    throw new Error("Failed to fetch matches")
  }
}

async function findMatchByHomeTeamId(homeTeamId: number) {
  try {
    const team = await teamGrpc.findTeamById(homeTeamId)
    if (!team) {
      throw new Error("Team not found")
    }

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
    const team = await teamGrpc.findTeamById(awayTeamId)
    if (!team) {
      throw new Error("Team not found")
    }

    return await matchRepository.findMatchByAwayTeamId(awayTeamId)
  } catch (error) {
    console.error(
      `Error fetching matches for away team id ${awayTeamId}:`,
      error,
    )
    throw new Error("Failed to fetch matches")
  }
}

async function findMatchByGroupId(groupId: number) {
  try {
    const group = await tournamentGrpc.findGroupById(groupId)
    if (!group) {
      throw new Error("Group not found")
    }
    return await matchRepository.findMatchByGroupId(groupId)
  } catch (error) {
    console.error(`Error fetching matches for group id ${groupId}:`, error)
    throw new Error("Failed to fetch matches")
  }
}

const matchService = {
  createMatch,
  getAllMatches,
  findMatchById,
  findMatchByTournamentId,
  findMatchByStadiumId,
  findMatchByHomeTeamId,
  findMatchByAwayTeamId,
  findMatchByGroupId,
}

export default matchService
