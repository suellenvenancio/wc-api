import { prisma } from "@wc-app/database";

export async function createPlayer({name, teamId, position, overallRating}: {name: string, teamId: number, position: string, overallRating: number}){
    return await prisma.player.create({
    data: {
        name,  
       position,
       overallRating,
       teamId,
       
      }
  })
}

async function getAllPlayers() {
  return await prisma.player.findMany()
}

async function findPlayerById(id: number) {
  return await prisma.player.findUnique({
    where: {
      id,
    },
  })
}

async function findPlayerByTeamId(teamId: number) {
  return await prisma.player.findMany({
    where: {
      teamId,
    },
  })
}

const playerRepository = {
  createPlayer,
  getAllPlayers,
  findPlayerById,
  findPlayerByTeamId,
}

export default playerRepository 