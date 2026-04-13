import teamGrpc from "../grpc/grpc-client/team.grpc"
import { userGrpc } from "../grpc/grpc-client/user.grpc"
import lineupRepository from "../repository/lineup.repository"
import matchRepository from "../repository/match.repository"

async function createOrUpdateLineup({
  userId,
  matchId,
  teamId,
  formation,
  players,
}: {
  userId: string
  matchId: number
  teamId: number
  formation: string
  players: { playerId: number; positionIndex: number }[]
}) {
  try {
    const user = await userGrpc.findUserById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    const match = await matchRepository.findMatchById(matchId)
    if (!match) {
      throw new Error("Match not found")
    }

    const team = await teamGrpc.findTeamById(teamId)
    if (!team) {
      throw new Error("Team not found")
    }

    for (const player of players) {
      const playerFound = await teamGrpc.findPlayerById(player.playerId)
      if (!playerFound) {
        throw new Error("Player not found")
      }
    }

    return await lineupRepository.upsertLineup({
      userId,
      matchId,
      teamId,
      formation,
      players,
    })
  } catch (error) {
    console.error("Error creating/updating lineup:", error)
    throw new Error("Failed to create/update lineup")
  }
}

async function upsertDefaultLineup({
  formation,
  players,
  teamId,
  userId,
}: {
  userId: string
  teamId: number
  formation: string
  players: {
    playerId: number
    positionIndex: number
  }[]
}) {
  try {
    const user = await userGrpc.findUserById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    const team = await teamGrpc.findTeamById(teamId)
    if (!team) {
      throw new Error("Team not found")
    }

    for (const player of players) {
      const playerFound = await teamGrpc.findPlayerById(player.playerId)
      if (!playerFound) {
        throw new Error("Player not found")
      }
    }

    return await lineupRepository.upsertDefaultLineup(
      userId,
      teamId,
      formation,
      players,
    )
  } catch (error) {
    console.error("Error upserting default lineup:", error)
    throw new Error("Failed to upsert default lineup")
  }
}

async function findDefaultLineupByTeamAndUser(userId: string, teamId: number) {
  try {
    const user = await userGrpc.findUserById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    const team = await teamGrpc.findTeamById(teamId)
    if (!team) {
      throw new Error("Team not found")
    }

    return await lineupRepository.findDefaultLineupByTeamAndUser(userId, teamId)
  } catch (error) {
    console.error(
      `Error fetching default lineup for user ${userId} and team ${teamId}:`,
      error,
    )
    throw new Error("Failed to fetch default lineup")
  }
}

const lineupService = {
  createOrUpdateLineup,
  upsertDefaultLineup,
  findDefaultLineupByTeamAndUser,
}

export default lineupService
