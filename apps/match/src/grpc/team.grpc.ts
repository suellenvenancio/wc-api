import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { Team } from "@wc-app/database"

const GRPC_PORT = process.env.TEAM_GRPC_PORT || "50054"
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

const client = new teamProto.TeamService(
  `localhost:${GRPC_PORT}`,
  grpc.credentials.createInsecure(),
)

const teamGrpc = {
  findTeamById: (id: number): Promise<Team | null> => {
    return new Promise((resolve, reject) => {
      client.FindTeamById({ id }, (err: any, response: any) => {
        if (err) {
          if (err.code === grpc.status.NOT_FOUND) {
            return resolve(null)
          }
          return reject(err)
        }
        resolve(response)
      })
    })
  },
}

export default teamGrpc
