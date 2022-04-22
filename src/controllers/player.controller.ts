import Player from '../models/player.model'
import { registerSchema, updateSchema } from '../validators/user.validation'
import { Request, Response } from 'express'

const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const result = await Player.findAll()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getPlayerById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await Player.findByPk(id)
    if (!result) return res.status(404)
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerPlayer = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send({ error: errorMsg })
  }

  try {
    const result = await Player.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updatePlayer = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedPlayer = await Player.update({ ...req.body }, { where: { id: userId } })
    if (!updatedPlayer) return res.status(404).send('Player not found!')
    const result = await Player.findByPk(userId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deletePlayer = async (req: Request, res: Response) => {
  try {
    const result = await Player.findByPk(req.params.id)
    if (!result) {
      return res.status(404)
    } else {
      await result.destroy()
      return res.send(result)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getAllPlayers, getPlayerById, registerPlayer, updatePlayer, deletePlayer }
