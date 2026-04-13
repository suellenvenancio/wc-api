import { prisma } from "@wc-app/database"

async function createMatch({
  matchDate,
  homeScore,
  awayScore,
  tournamentId,
  stadiumId,
  homeTeamId,
  awayTeamId,
}: {
  matchDate: Date
  homeScore: number
  awayScore: number
  tournamentId: number
  stadiumId: number
  homeTeamId: number
  awayTeamId: number
}) {
  return await prisma.match.create({
    data: {
      matchDate,
      homeScore,
      awayScore,
      tournamentId,
      stadiumId,
      homeTeamId,
      awayTeamId,
    },
  })
}

async function getAllMatches() {
  return await prisma.match.findMany({
    include: {
      homeTeam: true,
      awayTeam: true,
      stadium: true,
      tournament: true,
    },
    orderBy: {
      matchDate: "asc",
    },
  })
}

async function findMatchById(id: number) {
  return await prisma.match.findUnique({
    where: {
      id,
    },
  })
}

async function findMatchByTournamentId(tournamentId: number) {
  return await prisma.match.findMany({
    where: {
      tournamentId: Number(tournamentId),
    },
    include: {
      homeTeam: true,
      awayTeam: true,
      stadium: true,
      tournament: true,
    },
    orderBy: {
      matchDate: "asc",
    },
  })
}

async function findMatchByStadiumId(stadiumId: number) {
  return await prisma.match.findMany({
    where: {
      stadiumId,
    },
  })
}

async function findMatchByHomeTeamId(homeTeamId: number) {
  return await prisma.match.findMany({
    where: {
      homeTeamId,
    },
  })
}

async function findMatchByAwayTeamId(awayTeamId: number) {
  return await prisma.match.findMany({
    where: {
      awayTeamId,
    },
  })
}

async function findMatchByGroupId(groupId: number) {
  return await prisma.match.findMany({
    where: {
      tournament: {
        groups: {
          some: {
            id: groupId,
          },
        },
      },
    },
  })
}

const matchRepository = {
  createMatch,
  getAllMatches,
  findMatchById,
  findMatchByTournamentId,
  findMatchByStadiumId,
  findMatchByHomeTeamId,
  findMatchByAwayTeamId,
  findMatchByGroupId,
}

export default matchRepository
