import * as grpc from "@grpc/grpc-js"
import lineupRepository from "../../repository/lineup.repository"
import matchRepository from "../../repository/match.repository"

export const matchGrpcService = {
  FindMatchById: async (call: any, callback: any) => {
    try {
      const matchId = Number(call.request.id)
      const match = await matchRepository.findMatchById(matchId)

      if (!match) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Match not found",
        })
      }

      callback(null, {
        id: String(match.id),
        homeTeamId: String(match.homeTeamId),
        awayTeamId: String(match.awayTeamId),
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        tournamentId: match.tournamentId,
        matchDate: match.matchDate,
      })
    } catch (error) {
      console.error("gRPC FindTeamById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },

  FindDefaultLineupById: async (call: any, callback: any) => {
    try {
      const id = Number(call.request.id)
      const lineup = await lineupRepository.findDefaultLineupById(id)

      if (!lineup) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Lineup not found",
        })
      }

      callback(null, {
        id: String(lineup.id),
        formation: lineup.formation,
        userId: String(lineup.userId),
        teamId: String(lineup.teamId),
      })
    } catch (error) {
      console.error("gRPC FindDefaultLineupById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },
}
