import proxy from "@fastify/http-proxy"
import dotenv from "dotenv"
import fastify from "fastify"

dotenv.config()

const app = fastify({ logger: true })

app.register(proxy, {
  upstream: `http://localhost:${process.env.AUTH_PORT || "3331"}`,
  prefix: "/auth",
  rewritePrefix: "/auth",
})
app.register(proxy, {
  upstream: `http://localhost:${process.env.AUTH_PORT || "3331"}`,
  prefix: "/users",
  rewritePrefix: "/users",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.MATCH_PORT || "3332"}`,
  prefix: "/matches",
  rewritePrefix: "/matches",
})
app.register(proxy, {
  upstream: `http://localhost:${process.env.MATCH_PORT || "3332"}`,
  prefix: "/lineups",
  rewritePrefix: "/lineups",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.SIMULATE_PORT || "3333"}`,
  prefix: "/simulate",
  rewritePrefix: "/simulate",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TEAM_PORT || "3334"}`,
  prefix: "/teams",
  rewritePrefix: "/teams",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TEAM_PORT || "3334"}`,
  prefix: "/players",
  rewritePrefix: "/players",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TEAM_PORT || "3334"}`,
  prefix: "/coaches",
  rewritePrefix: "/coaches",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TOURNAMENT_PORT || "3335"}`,
  prefix: "/tournaments",
  rewritePrefix: "/tournaments",
})

// A simple health check for the gateway itself
app.get("/", async (request, reply) => {
  return { status: "Gateway is running (REST Proxy)" }
})

app.listen(
  {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: "0.0.0.0",
  },
  (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`API Gateway REST Proxy listening on ${address}`)
  },
)
