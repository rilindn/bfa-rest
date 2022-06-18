import { Request, Response } from 'express'
import Club from '../models/club.model'
import User from '../models/user.model'
import Bookmark from '../models/bookmark.model'
import { registerSchema } from '../validators/bookmark.validation'
import Player from '../models/player.model'

const getMyBookmarks = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return

    const result = await Bookmark.findAll({
      order: [['createdAt', 'DESC']],
      where: { ClubId: id },
      include: [{ model: Club, include: [{ model: User }] }],
    })
    if (!result) return res.status(404).send('No bookmarks found!')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createBookmark = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(404).send({ error: errorMsg })
  }

  try {
    const result = await Bookmark.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const removeBookmark = async (req: Request, res: Response) => {
  try {
    const result = await Bookmark.findByPk(req.params.id)
    if (!result) return res.status(404).send('Bookmark not found!')

    await result.destroy()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getMyBookmarks, createBookmark, removeBookmark }
