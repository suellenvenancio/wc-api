import { prisma } from "@wc-app/database"

async function createTeam({ name }: { name: string }) {
  return await prisma.team.create({
    data: {
      name,
    },
  })
}

async function getAllTeams() {
  return await prisma.team.findMany({
    include: {
      players: true,
    },
  })
}

async function findTeamById(id: number) {
  return await prisma.team.findUnique({
    where: {
      id,
    },
    include: {
      players: true,
    },
  })
}

async function findTeamsByGroupId(groupId: number) {
  return await prisma.team.findMany({
    where: {
      groupId,
    },
  })
}

const teamRepository = {
  createTeam,
  getAllTeams,
  findTeamById,
  findTeamsByGroupId,
}

export default teamRepository
