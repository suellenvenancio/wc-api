import groupRepository from "../repository/group.repository"

async function createGroup({
  name,
  championshipId,
}: {
  name: string
  championshipId: number
}) {
  try {
    return await groupRepository.createGroup({ name, championshipId })
  } catch (error) {
    console.error("Error creating group:", error)
    throw new Error("Failed to create group")
  }
}

async function getAllGroups() {
  try {
    return await groupRepository.getAllGroups()
  } catch (error) {
    console.error("Error fetching groups:", error)
    throw new Error("Failed to fetch groups")
  }
}

async function findGroupById(id: number) {
  try {
    return await groupRepository.findGroupById(id)
  } catch (error) {
    console.error(`Error fetching group with id ${id}:`, error)
    throw new Error("Failed to fetch group")
  }
}

async function findGroupByChampionshipId(championshipId: number) {
  try {
    return await groupRepository.findGroupByChampionshipId(championshipId)
  } catch (error) {
    console.error(
      `Error fetching groups for championship id ${championshipId}:`,
      error,
    )
    throw new Error("Failed to fetch groups")
  }
}

const groupService = {
  createGroup,
  getAllGroups,
  findGroupById,
  findGroupByChampionshipId,
}

export default groupService
