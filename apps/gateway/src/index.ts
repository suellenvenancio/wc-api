import cors from "@fastify/cors"
import proxy from "@fastify/http-proxy"
import dotenv from "dotenv"
import fastify from "fastify"

dotenv.config()

const app = fastify({ logger: true })

app.register(cors, {
  origin: ["http://192.168.1.26:3000", "http://localhost:3000", "http://192.168.1.26"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.AUTH_PORT || "3331"}`,
  prefix: "/auth",
  rewritePrefix: "/auth",
})
app.register(proxy, {
  upstream: `http://localhost:${process.env.AUTH_PORT || "3331"}`,
  prefix: "/user",
  rewritePrefix: "/user",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.MATCH_PORT || "3332"}`,
  prefix: "/match",
  rewritePrefix: "/match",
})
app.register(proxy, {
  upstream: `http://localhost:${process.env.MATCH_PORT || "3332"}`,
  prefix: "/lineup",
  rewritePrefix: "/lineup",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.SIMULATE_PORT || "3333"}`,
  prefix: "/simulate",
  rewritePrefix: "/simulate",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TEAM_PORT || "3334"}`,
  prefix: "/team",
  rewritePrefix: "/team",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TEAM_PORT || "3334"}`,
  prefix: "/player",
  rewritePrefix: "/player",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TEAM_PORT || "3334"}`,
  prefix: "/coach",
  rewritePrefix: "/coach",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TOURNAMENT_PORT || "3335"}`,
  prefix: "/tournament",
  rewritePrefix: "/tournament",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TOURNAMENT_PORT || "3335"}`,
  prefix: "/group",
  rewritePrefix: "/group",
})

app.register(proxy, {
  upstream: `http://localhost:${process.env.TOURNAMENT_PORT || "3335"}`,
  prefix: "/stadium",
  rewritePrefix: "/stadium",
})

// A simple health check for the gateway itself
app.get("/", async (request, reply) => {
  return { status: "Gateway is running (REST Proxy)" }
})

app.listen(
  {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3330,
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
