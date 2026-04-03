import { prisma } from "@wc-app/database"

async function findUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } })
}

async function createUser(name: string, email: string, password: string) {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
}

const userRepository = {
  findUserById,
  createUser,
}

export default userRepository
