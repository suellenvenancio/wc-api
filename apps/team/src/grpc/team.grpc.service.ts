import * as grpc from "@grpc/grpc-js"
import teamRepository from "../repository/team.repository"

export const teamGrpcService = {
  findTeamById: async (call: any, callback: any) => {
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
}
