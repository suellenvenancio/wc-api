import bcrypt from "bcryptjs"
import userRepository from "../repository/user.repository"

export async function findUserById(id: string) {
  try {
    return await userRepository.findUserById(id)
  } catch (error) {
    console.log(error)
    throw new Error("Failed to find user")
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await userRepository.createUser(name, email, hashedPassword)
  } catch (error) {
    console.log(error)
    throw new Error("Failed to create user")
  }
}

const userService = {
  findUserById,
  createUser,
}

export default userService
