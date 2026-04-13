import * as grpc from "@grpc/grpc-js"
import groupRepository from "../repository/group.repository"
import stadiumRepository from "../repository/stadium.repository"
import tournamentRepository from "../repository/tournament.repository"

export const tournamentGrpcController = {
  FindGroupById: async (call: any, callback: any) => {
    try {
      const group = await groupRepository.findGroupById(Number(call.request.id))

      if (!group) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Group not found",
        })
      }

      callback(null, {
        id: group.id,
        name: group.name,
        tournamentId: group.tournamentId,
      })
    } catch (error) {
      console.error("gRPC GetGroupById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },

  FindTournamentById: async (call: any, callback: any) => {
    try {
      const tournament = await tournamentRepository.findTournamentById(
        call.request.id as number,
      )

      if (!tournament) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Tournament not found",
        })
      }

      callback(null, {
        id: tournament.id,
        name: tournament.name,
        year: tournament.year,
      })
    } catch (error) {
      console.error("gRPC GetTournamentById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },

  FindStadiumById: async (call: any, callback: any) => {
    try {
      const stadium = await stadiumRepository.findStadiumById(
        Number(call.request.id),
      )

      if (!stadium) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Stadium not found",
        })
      }

      callback(null, {
        id: stadium.id,
        name: stadium.name,
        city: stadium.city,
        capacity: stadium.capacity,
      })
    } catch (error) {
      console.error("gRPC GetStadiumById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },
}
