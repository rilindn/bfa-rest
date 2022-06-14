import { registerSchema } from '../validators/teamPlayer.validation'
import { Request, Response } from 'express'
import User from '../models/user.model'
import Team from '../models/team/team.model'
import Player from '../models/player.model'
import TeamPlayer from '../models/team/teamPlayer.model'

const getMyTeam = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const team: any = await Team.findOne({
      where: { ClubId: id },
      include: [{ model: TeamPlayer, include: [{ model: Player, include: [{ model: User }] }] }],
    })

    return res.send(team)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createTeamPlayer = async (req: Request, res: Response) => {
  const { ClubId, ...payload } = req.body
  const validationResult = registerSchema.validate({ ...payload })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(404).send({ error: errorMsg })
  }

  try {
    const team: any = await Team.findOrCreate({
      where: { ClubId },
      raw: true,
    })

    payload.TeamId = team[0].id
    if (!payload.TeamId) return res.status(404).send('Please provide a team id!')

    const result = await TeamPlayer.create({ ...payload })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const deleteTeamPlayer = async (req: Request, res: Response) => {
  try {
    const result = await TeamPlayer.findByPk(req.params.id)
    if (!result) return res.status(404).send('Player not found')

    await result.destroy()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getMyTeam, createTeamPlayer, deleteTeamPlayer }
