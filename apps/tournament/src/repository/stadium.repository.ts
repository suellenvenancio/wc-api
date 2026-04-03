import { prisma } from "@wc-app/database";

async function createStadium({name, city, capacity}: {name: string, city: string, capacity: number}) {
    return await prisma.stadium.create({
    data: {
        name,  
        city,
        capacity,
      }
  })
}

async function getAllStadiums() {
  return await prisma.stadium.findMany()
}

async function findStadiumById(id: number) {
  return await prisma.stadium.findUnique({
    where: {
      id,
    },
  })
}

const stadiumRepository = {
  createStadium,
  getAllStadiums,
  findStadiumById,
}

export default stadiumRepository  