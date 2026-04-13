import matchGrpc from "../grpc/grpc-client/match.grpc"
import aiRepository from "../repository/ai.repository"
import promptRepository from "../repository/prompt.repository"

async function simulateMatchPrompt(
  promptName: string,
  teamHome: string,
  teamAway: string,
  teamHomePlayers: string[],
  teamAwayPlayers: string[],
  tacticHomeTeam: string,
  tacticAwayTeam: string,
  matchId: number,
) {
  const match = await matchGrpc.findMatchById(matchId)

  if (!match) {
    throw new Error("Match não encontrado")
  }

  const prompt = await promptRepository.findByName(promptName)

  if (!prompt) {
    throw new Error("Prompt não encontrado")
  }

  prompt.template = prompt.template.replace("{teamHome}", teamHome)
  prompt.template = prompt.template.replace("{teamAway}", teamAway)
  prompt.template = prompt.template.replace(
    "{teamHomePlayers}",
    teamHomePlayers.join(", "),
  )
  prompt.template = prompt.template.replace(
    "{teamAwayPlayers}",
    teamAwayPlayers.join(", "),
  )
  prompt.template = prompt.template.replace("{tacticHomeTeam}", tacticHomeTeam)
  prompt.template = prompt.template.replace("{tacticAwayTeam}", tacticAwayTeam)

  const promptResponse = await aiRepository.getByPrompt(prompt.template)
  console.log(promptResponse)

  if (promptResponse) {
    await promptRepository.createPromptLog({
      response: promptResponse.text(),
      sentPrompt: prompt.template,
      matchId,
      promptId: prompt.id,
    })
  }
  return promptResponse
}

async function simulateDefaultTeamPrompt(
  promptName: string,
  tactic: string,
  teamName: string,
  teamPlayers: string[],
  userLineupId: number,
) {
  const prompt = await promptRepository.findByName(promptName)

  if (!prompt) {
    throw new Error("Prompt não encontrado")
  }

  prompt.template = prompt.template.replace("{tactic}", tactic)
  prompt.template = prompt.template.replace("{teamName}", teamName)
  prompt.template = prompt.template.replace(
    "{teamPlayers}",
    teamPlayers.join(", "),
  )

  const promptResponse = await aiRepository.getByPrompt(prompt.template)
  console.log(promptResponse.candidates?.[0].content.parts[0].text)

  if (promptResponse) {
    return await promptRepository.createPromptLog({
      response: promptResponse.text(),
      sentPrompt: prompt.template,
      promptId: prompt.id,
      userLineupId,
    })
  }
  return promptResponse
}

const simulateService = {
  simulateMatchPrompt,
  simulateDefaultTeamPrompt,
}

export default simulateService
