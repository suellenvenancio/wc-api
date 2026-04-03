import z from "zod"

export const createLineupSchema = z.object({
  userId: z.string(),
  teamId: z.number(),
  formation: z.string(),
  matchId: z.number(),
  players: z.array(
    z.object({
      playerId: z.number(),
      positionIndex: z.number(),
    }),
  ),
})

export const defaultLineupSchema = z.object({
  userId: z.string(),
  teamId: z.number(),
  formation: z.string(),
  players: z.array(
    z.object({
      playerId: z.number(),
      positionIndex: z.number(),
    }),
  ),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export const simulateMatchSchema = z.object({
  promptName: z.string(),
  homeTeam: z.string(),
  awayTeam: z.string(),
  homeTeamPlayers: z.array(z.string()),
  awayTeamPlayers: z.array(z.string()),
  tacticHomeTeam: z.string(),
  tacticAwayTeam: z.string(),
})

export const simulateDefaultTeamSchema = z.object({
  promptName: z.string(),
  tactic: z.string(),
  teamName: z.string(),
  teamPlayers: z.array(z.string()),
})
