import * as grpc from "@grpc/grpc-js"
import userRepository from "../../repository/user.repository"

export const authGrpcController = {
  FindUserById: async (call: any, callback: any) => {
    try {
      const user = await userRepository.findUserById(call.request.id)

      if (!user) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "User not found",
        })
      }

      callback(null, {
        id: user.id,
        name: user.name,
        email: user.email,
      })
    } catch (error) {
      console.error("gRPC GetUserById error:", error)
      callback({
        code: grpc.status.INTERNAL,
        details: "An internal error occurred",
      })
    }
  },
}
