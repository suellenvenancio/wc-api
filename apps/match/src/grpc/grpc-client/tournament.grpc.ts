import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { Group, Team } from "@wc-app/database"

const GRPC_PORT = process.env.TOURNAMENT_GRPC_PORT || "50055"
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

const client = new tournamentProto.TournamentService(
  `127.0.0.1:${GRPC_PORT}`,
  grpc.credentials.createInsecure(),
)

const tournamentGrpc = {
  findGroupById: (id: number): Promise<Group | null> => {
    return new Promise((resolve, reject) => {
      client.FindGroupById({ id }, (err: any, response: any) => {
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

  findTournamentById: (id: number): Promise<Team | null> => {
    return new Promise((resolve, reject) => {
      client.FindTournamentById({ id }, (err: any, response: any) => {
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

  findStadiumById: (id: number): Promise<Team | null> => {
    return new Promise((resolve, reject) => {
      client.FindStadiumById({ id }, (err: any, response: any) => {
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

export default tournamentGrpc
