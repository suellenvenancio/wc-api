import { PrismaPg } from "@prisma/adapter-pg"
import * as dotenv from "dotenv"
import * as path from "path"
import { PrismaClient } from "../prisma/generated/client"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

const connectionString = `${process.env.DATABASE_URL}`
console.log(connectionString)
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export * from "../prisma/generated/client"
export { prisma, PrismaClient }
