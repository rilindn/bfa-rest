import { Request, Response } from 'express'
import Club from '../models/club.model'
import Player from '../models/player.model'
import Post from '../models/post.model'
import PostReport from '../models/postReport.model'
import User from '../models/user.model'
import { registerSchema } from '../validators/postReport.validation'

const getAllReports = async (req: Request, res: Response) => {
  const id = req.query.id

  try {
    const result = await PostReport.findAll({
      order: [['updatedAt', 'DESC']],
      include: [
        { model: User, include: [{ model: Player }, { model: Club }] },
        { model: Post, include: [{ model: User, include: [{ model: Player }, { model: Club }] }] },
      ],
      where: { ...(id && { '$Post.UserId$': id }) },
    })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createReport = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(404).send({ error: errorMsg })
  }

  try {
    const result = await PostReport.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const deleteReport = async (req: Request, res: Response) => {
  try {
    const result = await PostReport.findByPk(req.params.id)
    if (!result) return res.status(404).send('Post report not found!')

    await result.destroy()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getAllReports, createReport, deleteReport }
