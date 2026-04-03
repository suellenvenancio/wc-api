import type { FastifyReply, FastifyRequest } from "fastify"
import authService from "../service/auth.service"
import type { LoginBody } from "../types.ts"

export async function login(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = request.body
    if (!email || !password) {
      return reply
        .status(400)
        .send({ message: "Email e senha são obrigatórios" })
    }

    const user = await authService.login({ email, password })

    const payload = {
      id: user?.id,
      email: user?.email,
      name: user?.name,
    }
    const token = request.jwt.sign(payload)

    reply.setCookie("access_token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    })

    return reply.status(200).send(user)
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token")

  return reply.send({ message: "Logout successful" })
}
