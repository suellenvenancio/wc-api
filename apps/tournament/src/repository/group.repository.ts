import { prisma } from "@wc-app/database"

async function createGroup({
  name,
  championshipId,
}: {
  name: string
  championshipId: number
}) {
  return await prisma.group.create({
    data: {
      name,
      championshipId,
    },
  })
}

async function getAllGroups() {
  return await prisma.group.findMany({
    include: {
      teams: {
        include: {
          players: true,
        },
      },
      standings: true,
    },
  })
}

async function findGroupById(id: number) {
  return await prisma.group.findUnique({
    where: {
      id,
    },
  })
}

async function findGroupByChampionshipId(championshipId: number) {
  return await prisma.group.findMany({
    where: {
      championshipId,
    },
  })
}

const groupRepository = {
  createGroup,
  getAllGroups,
  findGroupById,
  findGroupByChampionshipId,
}

export default groupRepository
