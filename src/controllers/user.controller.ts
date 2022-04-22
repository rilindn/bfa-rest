import User from '../models/user.model'
import { registerSchema, updateSchema } from '../validators/user.validation'
import { Request, Response } from 'express'

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await User.findByPk(id)
    if (!result) return res.status(404)
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerUser = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send({ error: errorMsg })
  }

  try {
    const result = await User.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedUser = await User.update({ ...req.body }, { where: { id: userId } })
    if (!updatedUser) return res.status(404).send('User not found!')
    const result = await User.findByPk(userId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await User.findByPk(req.params.id)
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

export default { getAllUsers, getUserById, registerUser, updateUser, deleteUser }
