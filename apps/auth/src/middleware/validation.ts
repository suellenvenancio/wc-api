import { FastifyReply, FastifyRequest } from "fastify"
import { z, ZodError } from "zod"

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: FastifyRequest, res: FastifyReply, next: () => void) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.message
        res.status(400).send({ error: "Invalid data", details: errorMessages })
      } else {
        res.status(500).send({ error: "Internal Server Error" })
      }
    }
  }
}
