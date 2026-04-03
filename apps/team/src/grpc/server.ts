import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { teamGrpcService } from "./team.grpc.service"

export function startGrpcServer() {
  const GRPC_PORT = process.env.GRPC_PORT || "50054"
  const PROTO_PATH = require.resolve("@wc-app/protos/team.proto")

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })

  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any
  const teamProto = protoDescriptor.team

  const grpcServer = new grpc.Server()

  grpcServer.addService(teamProto.TeamService.service, teamGrpcService)

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
