import stadiumRepository from "../repository/stadium.repository"

async function createStadium({
  name,
  city,
  capacity,
}: {
  name: string
  city: string
  capacity: number
}) {
  try {
    return await stadiumRepository.createStadium({ name, city, capacity })
  } catch (error) {
    console.error("Error creating stadium:", error)
    throw new Error("Failed to create stadium")
  }
}

async function getAllStadiums() {
  try {
    return await stadiumRepository.getAllStadiums()
  } catch (error) {
    console.error("Error fetching stadiums:", error)
    throw new Error("Failed to fetch stadiums")
  }
}

async function findStadiumById(id: number) {
  try {
    return await stadiumRepository.findStadiumById(id)
  } catch (error) {
    console.error(`Error fetching stadium with id ${id}:`, error)
    throw new Error("Failed to fetch stadium")
  }
}

const stadiumService = {
  createStadium,
  getAllStadiums,
  findStadiumById,
}

export default stadiumService
