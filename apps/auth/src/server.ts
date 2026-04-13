import app from "."
import { startGrpcServer } from "./grpc/grpc-server/server"

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3331
app.listen({ host: "0.0.0.0", port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Fastify Server listening on ${address}`)
})

startGrpcServer()
