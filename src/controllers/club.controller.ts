import Club from '../models/club.model'
import { registerSchema, updateSchema } from '../validators/club.validation'
import { Request, Response } from 'express'

const getAllClubs = async (req: Request, res: Response) => {
  try {
    const result = await Club.findAll()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getClubById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await Club.findByPk(id)
    if (!result) return res.status(404)
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerClub = async (req: Request, res: Response) => {
  console.log('first')
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send({ error: errorMsg })
  }

  try {
    const result = await Club.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateClub = async (req: Request, res: Response) => {
  const clubId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, clubId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedClub = await Club.update({ ...req.body }, { where: { id: clubId } })
    if (!updatedClub) return res.status(404).send('User not found!')
    const result = await Club.findByPk(clubId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteClub = async (req: Request, res: Response) => {
  try {
    const result = await Club.findByPk(req.params.id)
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

export default { getAllClubs, getClubById, registerClub, updateClub, deleteClub }
