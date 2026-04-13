import { prisma } from "@wc-app/database"

async function createGroup({
  name,
  tournamentId,
}: {
  name: string
  tournamentId: number
}) {
  return await prisma.group.create({
    data: {
      name,
      tournamentId,
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
    include: {
      teams: true,
    },
  })
}

async function findGroupByTournamentId(tournamentId: number) {
  return await prisma.group.findMany({
    where: {
      tournamentId: Number(tournamentId),
    },
    include: {
      teams: {
        include: {
          players: true,
        },
      },
    },
  })
}

const groupRepository = {
  createGroup,
  getAllGroups,
  findGroupById,
  findGroupByTournamentId,
}

export default groupRepository
