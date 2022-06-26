import { Request, Response } from 'express'
import Club from '../models/club.model'
import Player from '../models/player.model'
import Post from '../models/post.model'
import PostReport from '../models/postReport.model'
import User from '../models/user.model'
import { registerSchema } from '../validators/postReport.validation'

const getAllReports = async (req: Request, res: Response) => {
  try {
    const result = await PostReport.findAll({ order: [['updatedAt', 'DESC']] })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

// const getPostReports = async (req: Request, res: Response) => {
//   const id = req.params.id
//   try {
//     if (!id) return

//     const result = await PostReport.findAll({
//       order: [['createdAt', 'DESC']],
//       where: { postId: id },
//     })
//     if (!result) return res.status(404).send('No post reports found!')
//     return res.send(result)
//   } catch (error) {
//     return res.status(500).send(error)
//   }
// }

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
