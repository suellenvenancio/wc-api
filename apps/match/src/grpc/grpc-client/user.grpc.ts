import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

const GRPC_PORT = process.env.AUTH_GRPC_PORT || "50051"
const PROTO_PATH = require.resolve("@wc-app/protos/auth.proto")

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any
const authProto = protoDescriptor.auth

const client = new authProto.AuthService(
  `127.0.0.1:${GRPC_PORT}`,
  grpc.credentials.createInsecure(),
)

export const userGrpc = {
  findUserById: (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      client.FindUserById({ id }, (err: any, response: any) => {
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
