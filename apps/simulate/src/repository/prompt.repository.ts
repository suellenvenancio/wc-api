import { prisma } from "@wc-app/database"

async function findByName(name: string) {
  return await prisma.promptTemplate.findUnique({
    where: {
      name,
    },
  })
}

async function createPromptLog({
  response,
  sentPrompt,
  matchId,
  promptId,
  userTacticId,
}: {
  response: string
  sentPrompt: string
  matchId?: number
  promptId: number
  userTacticId?: number
}) {
  return await prisma.promptLog.create({
    data: {
      response,
      sentPrompt,
      matchId,
      promptId,
      userTacticId,
    },
  })
}

const promptRepository = {
  findByName,
  createPromptLog,
}

export default promptRepository
