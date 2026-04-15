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

async function findTeamsByTournamentId(tournamentId: number) {
  return await prisma.team.findMany({
    where: {
      group: {
        tournamentId: tournamentId,
      },
    },
    include: {
      players: true,
    },
  })
}

async function findTeamByName(name: string) {
  return await prisma.team.findUnique({
    where: {
      name,
    },
  })
}

const teamRepository = {
  createTeam,
  getAllTeams,
  findTeamById,
  findTeamsByGroupId,
  findTeamsByTournamentId,
  findTeamByName,
}

export default teamRepository
