import { prisma } from "@wc-app/database"

async function upsertLineup({
  userId,
  matchId,
  teamId,
  formation,
  players,
}: {
  userId: string
  matchId: number
  teamId: number
  formation: string
  players: { playerId: number; positionIndex: number }[]
}) {
  return await prisma.matchLineup.upsert({
    where: {
      userId_matchId_teamId: { userId, matchId, teamId },
    },
    update: {
      formation,
      players: {
        deleteMany: {},
        create: players,
      },
    },
    create: {
      userId,
      matchId,
      teamId,
      formation,
      players: {
        create: players,
      },
    },
  })
}

async function findLineup(userId: string, matchId: number, teamId: number) {
  return await prisma.matchLineup.findUnique({
    where: {
      userId_matchId_teamId: { userId, matchId, teamId },
    },
    include: {
      players: { include: { player: true } },
    },
  })
}

async function findAllByMatch(userId: string, matchId: number) {
  return await prisma.matchLineup.findMany({
    where: { userId, matchId },
    include: {
      team: true,
      players: { include: { player: true } },
    },
  })
}

async function upsertDefaultLineup(
  userId: string,
  teamId: number,
  formation: string,
  players: { playerId: number; positionIndex: number }[],
) {
  return await prisma.userTeamLineup.upsert({
    where: {
      userId_teamId: { userId, teamId },
    },
    update: {
      formation,
      players: {
        deleteMany: {},
        create: players,
      },
    },
    create: {
      userId,
      teamId,
      formation,
      players: {
        create: players,
      },
    },
  })
}

async function findDefaultLineupByTeamAndUser(userId: string, teamId: number) {
  return await prisma.userTeamLineup.findUnique({
    where: {
      userId_teamId: { userId, teamId },
    },
    include: {
      players: { include: { player: true } },
    },
  })
}

async function findDefaultLineupById(id: number) {
  return await prisma.userTeamLineup.findUnique({
    where: {
      id,
    },
    include: {
      players: { include: { player: true } },
    },
  })
}

const lineupRepository = {
  upsertLineup,
  findLineup,
  findAllByMatch,
  upsertDefaultLineup,
  findDefaultLineupByTeamAndUser,
  findDefaultLineupById,
}

export default lineupRepository
