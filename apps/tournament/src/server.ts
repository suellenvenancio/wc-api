import app from "."
import { startGrpcServer } from "./grpc-server/server"

startGrpcServer()

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3335
app.listen({ host: "0.0.0.0", port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Fastify Server listening on ${address}`)
})
