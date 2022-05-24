import { registerSchema } from '../validators/like.validation'
import { Request, Response } from 'express'
import Like from './../models/like.model'

const getPostLikes = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await Like.findAll({ where: { PostId: id } })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createLike = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    const result = await Like.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const removeLike = async (req: Request, res: Response) => {
  try {
    const result = await Like.findByPk(req.params.id)
    if (!result) {
      return res.status(404).send('Like not found')
    } else {
      await result.destroy()
      return res.send(result)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getPostLikes, createLike, removeLike }
