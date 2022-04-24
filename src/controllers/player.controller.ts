import Player from '../models/player.model'
import { playerRegisterSchema, playerUpdateSchema } from '../validators/player.validation'
import { Request, Response } from 'express'
import User from './../models/user.model'
import trimObjectValues from '../helpers/trimObjectValues'

const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll({ include: Player })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getPlayerById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return

    const result = await User.findByPk(id, { include: Player })
    if (!result) return res.status(404).send('Player not found')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerPlayer = async (req: Request, res: Response) => {
  const payload = trimObjectValues(req.body)
  const validationResult = playerRegisterSchema.validate({ ...payload })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }

  try {
    let { email, password, birthDate, role, profilePic, ...rest } = payload
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.create({ ...generals })
    await Player.create({ ...rest, UserId: user.id })

    const result = await User.findByPk(user.id, { include: Player })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updatePlayer = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = playerUpdateSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).send(errorMsg)
  }

  try {
    const { email, password, birthDate, role, profilePic, ...rest } = req.body
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.update({ ...generals }, { where: { id: userId } })
    const player = await Player.update({ ...rest }, { where: { UserId: userId } })

    if (!user || !player) return res.status(404).send('Player not found!')
    const result = await User.findByPk(userId, { include: Player })

    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deletePlayer = async (req: Request, res: Response) => {
  try {
    const result = await User.findByPk(req.params.id, { include: Player })
    if (!result) {
      return res.status(404).send('Player not found')
    } else {
      await result.destroy()
      return res.send(result)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getAllPlayers, getPlayerById, registerPlayer, updatePlayer, deletePlayer }
