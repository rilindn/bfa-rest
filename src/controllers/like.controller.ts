import { registerSchema } from '../validators/like.validation'
import { Request, Response } from 'express'
import Like from './../models/like.model'
import Player from '../models/player.model'
import Club from '../models/club.model'
import User from '../models/user.model'

const getPostLikes = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await Like.findAll({ where: { PostId: id }, include: [{ model: User, include: [{ model: Player }, { model: Club }] }] })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const checkIfLiked = async (req: Request, res: Response) => {
  const { PostId, UserId } = req.body
  try {
    if (!PostId || !UserId) return
    const result = await Like.findOne({ where: { PostId, UserId } })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const likePost = async (req: Request, res: Response) => {
  const { PostId, UserId } = req.body
  const validationResult = registerSchema.validate({ PostId, UserId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    const existingLike = await Like.findOne({ where: { PostId, UserId } })
    if (!existingLike) {
      await Like.create({ PostId, UserId, raw: true })
    }
    const postLikes = await Like.findAll({ where: { PostId }, include: [{ model: User, include: [{ model: Player }, { model: Club }] }] })
    return res.send(postLikes)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const unlikePost = async (req: Request, res: Response) => {
  const { PostId, UserId } = req.body
  try {
    if (!PostId || !UserId) return

    const result = await Like.findOne({ where: { PostId, UserId } })
    if (!result) return res.status(404).send('Not found')

    await result.destroy()
    const postLikes = await Like.findAll({ where: { PostId }, include: [{ model: User, include: [{ model: Player }, { model: Club }] }] })
    return res.send(postLikes)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getPostLikes, checkIfLiked, likePost, unlikePost }
