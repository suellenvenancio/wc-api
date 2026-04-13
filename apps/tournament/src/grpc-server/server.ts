import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { tournamentGrpcController } from "./tournament.grpc.controller"

export function startGrpcServer() {
  const GRPC_PORT = process.env.GRPC_PORT || "50055"
  const PROTO_PATH = require.resolve("@wc-app/protos/tournament.proto")

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any
  const tournamentProto = protoDescriptor.tournament

  const grpcServer = new grpc.Server()

  grpcServer.addService(
    tournamentProto.TournamentService.service,
    tournamentGrpcController,
  )

  grpcServer.bindAsync(
    `0.0.0.0:${GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`gRPC Server listening on 0.0.0.0:${port}`)
    },
  )
}
