import * as grpc from "@grpc/grpc-js"
import playerRepository from "../../repository/player.respository"
import teamRepository from "../../repository/team.repository"

export const teamGrpcService = {
  FindTeamById: async (call: any, callback: any) => {
    try {
      const teamId = Number(call.request.id)
      const team = await teamRepository.findTeamById(teamId)

      if (!team) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Team not found",
        })
      }

      callback(null, {
        id: String(team.id),
        name: team.name,
        flag: team.flag,
        rankingFifa: team.rankingFifa,
        groupId: team.groupId,
      })
    } catch (error) {
      console.error("gRPC FindTeamById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },
  FindPlayerById: async (call: any, callback: any) => {
    try {
      const playerId = Number(call.request.id)
      const player = await playerRepository.findPlayerById(playerId)

      if (!player) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Player not found",
        })
      }

      callback(null, {
        id: String(player.id),
        name: player.name,
        position: player.position,
        teamId: player.teamId,
      })
    } catch (error) {
      console.error("gRPC FindPlayerById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },
}
