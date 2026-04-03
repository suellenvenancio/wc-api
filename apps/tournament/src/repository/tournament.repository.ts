import { prisma } from "@wc-app/database"

async function createTournament({
  name,
  year,
}: {
  name: string
  year: number
}) {
  return await prisma.tournament.create({
    data: {
      name,
      year,
    },
  })
}

async function getAllTournaments() {
  return await prisma.tournament.findMany()
}

async function findTournamentById(id: number) {
  return await prisma.tournament.findUnique({
    where: {
      id,
    },
  })
}

const tournamentRepository = {
  createTournament,
  getAllTournaments,
  findTournamentById,
}

export default tournamentRepository
