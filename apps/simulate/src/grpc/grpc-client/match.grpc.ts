import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { Match, UserTeamLineup } from "@wc-app/database"

const GRPC_PORT = process.env.MATCH_GRPC_PORT || "50052"
const PROTO_PATH = require.resolve("@wc-app/protos/match.proto")

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any
const matchProto = protoDescriptor.match

const client = new matchProto.MatchService(
  `127.0.0.1:${GRPC_PORT}`,
  grpc.credentials.createInsecure(),
)

const matchGrpc = {
  findMatchById: (id: number): Promise<Match | null> => {
    return new Promise((resolve, reject) => {
      client.FindMatchById({ id }, (err: any, response: any) => {
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

  findDefaultLineupById: (id: number): Promise<UserTeamLineup | null> => {
    return new Promise((resolve, reject) => {
      client.FindDefaultLineupById({ id }, (err: any, response: any) => {
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

export default matchGrpc
