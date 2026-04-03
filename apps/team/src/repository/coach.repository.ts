import { prisma } from "@wc-app/database"

async function createCoach({name, teamId, preferredFormation}: {name: string, teamId: number, preferredFormation: string}){
    return await prisma.staff.create({
    data: {
        name,  
        teamId ,
        preferredFormation
     }
  })
}

async function getAllCoaches() {
  return await prisma.staff.findMany()
}

async function findCoachById(id: number) {
  return await prisma.staff.findUnique({
    where: {
      id,
    },
  })
}

async function findCoachByTeamId(teamId: number) {
  return await prisma.staff.findMany({
    where: {
      teamId,
    },
  })
}

const coachRepository = {
  createCoach,
  getAllCoaches,
  findCoachById,
  findCoachByTeamId,
}

export default coachRepository