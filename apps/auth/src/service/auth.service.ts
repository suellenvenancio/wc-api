import bcrypt from "bcryptjs"
import { prisma } from "@wc-app/database"

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password")
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  } catch (error) {
    console.error("Error during login:", error)
    throw new Error("Failed to login")
  }
}

const authService = {
  login,
}

export default authService
