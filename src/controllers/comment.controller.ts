import { registerSchema, updateSchema } from '../validators/comment.validation'
import { Request, Response } from 'express'
import Comment from './../models/comment.model'
import User from '../models/user.model'
import Player from '../models/player.model'
import Club from '../models/club.model'

const getPostComments = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await Comment.findAll({ where: { PostId: id }, include: [{ model: User, include: [{ model: Player }, { model: Club }] }] })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createComment = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send({ error: errorMsg })
  }

  try {
    const result = await Comment.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, commentId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedPost: any = await Comment.update({ ...req.body }, { where: { id: commentId } })
    if (!updatedPost) return res.status(404).send('Comment not found!')
    const result = await Comment.findByPk(commentId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteComment = async (req: Request, res: Response) => {
  try {
    const result = await Comment.findByPk(req.params.id)
    if (!result) return res.status(404).send('Comment not found')

    await result.destroy()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getPostComments, createComment, updateComment, deleteComment }
