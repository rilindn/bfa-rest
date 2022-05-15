import { registerSchema } from '../validators/follow.validation'
import { Request, Response } from 'express'
import Follow from './../models/follow.model'
import User from '../models/user.model'
import Player from '../models/player.model'
import Club from '../models/club.model'

const getMyFollowers = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const followers = await Follow.findAll({
      raw: true,
      where: {
        followedId: id,
      },
    })

    if (!followers) return res.status(404).send('No followers found!')
    const users = await Promise.all(
      followers.map(async (follow: any) => {
        const user = await User.findOne({
          where: {
            id: follow?.followerId,
          },
          include: [{ model: Player }, { model: Club }],
        })
        return user
      }),
    )
    return res.send(users)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getMyFollowings = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const followings = await Follow.findAll({
      raw: true,
      where: {
        followerId: id,
      },
    })

    if (!followings) return res.status(404).send('No followings found!')
    const users = await Promise.all(
      followings.map(async (follow: any) => {
        const user = await User.findOne({
          where: {
            id: follow?.followedId,
          },
          include: [{ model: Player }, { model: Club }],
        })
        return user
      }),
    )
    return res.send(users)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const checkFollow = async (req: Request, res: Response) => {
  const { followerId, followedId } = req.params
  try {
    const follow = await Follow.findOne({
      where: {
        followerId,
        followedId,
      },
    })
    return res.send(!!follow)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createFollow = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    const result = await Follow.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const unFollow = async (req: Request, res: Response) => {
  const { followerId, followedId } = req.params
  try {
    const follow = await Follow.findOne({
      where: {
        followerId,
        followedId,
      },
    })
    if (!follow) {
      return res.status(404)
    } else {
      await follow.destroy()
      return res.send(follow)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getMyFollowers, getMyFollowings, checkFollow, createFollow, unFollow }
