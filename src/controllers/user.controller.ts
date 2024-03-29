import User from '../models/user.model'
import { registerSchema, updateSchema, passwordChangeSchema } from '../validators/user.validation'
import { Request, Response } from 'express'
import sendEmail from '../utils/email/sendEmail'
import crypto from 'crypto'
import ResetCode from '../models/resetCode.model'
import bcrypt from 'bcrypt'
import Player from '../models/player.model'
import Club from '../models/club.model'
import Sequelize from 'sequelize'
import deleteResetCodes from '../helpers/deleteExpiredResetCodes'
import trimObjectValues from '../helpers/trimObjectValues'

const Op = Sequelize.Op

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll({
      include: [{ model: Player }, { model: Club }],
    })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await User.findByPk(id, { include: [{ model: Player }, { model: Club }] })
    if (!result) return res.status(404)
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getFilteredUsers = async (req: any, res: any) => {
  try {
    const { q, limit = 10, exclude = '' } = req.query
    const search = q ? `%${q.toLowerCase()}%` : ''
    const excludeIds = exclude ? exclude.split(',') : []
    const items: any = await User.findAll({
      limit,
      where: {
        [Op.or]: [
          { '$Player.firstName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Player.firstName')), 'LIKE', '%' + search + '%') },
          { '$Player.lastName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Player.lastName')), 'LIKE', '%' + search + '%') },
          { '$Club.clubName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Club.clubName')), 'LIKE', '%' + search + '%') },
          { email: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', '%' + search + '%') },
        ],
        [Op.and]: [{ id: { [Op.notIn]: excludeIds } }, { role: { [Op.notIn]: ['Admin'] } }],
      },
      include: [{ model: Player }, { model: Club }],
    })

    return res.status(200).send(items)
  } catch (error) {
    console.log(error)
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

const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = trimObjectValues(req.body)
  try {
    const user: any = await User.findOne({ where: { email }, include: [{ model: Player }, { model: Club }] })
    if (!user) return res.status(404).send('User not found')

    // delete old or expired reset codes
    await deleteResetCodes(email)

    const code = crypto.randomBytes(5).toString('hex')
    const salt = await bcrypt.genSalt(10)
    const hashedCode = await bcrypt.hash(code, salt)
    await ResetCode.create({
      userId: user.id,
      email,
      code: hashedCode,
    })

    await sendEmail(res, user, code)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const validateResetPasswordCode = async (req: Request, res: Response) => {
  const { email, code } = trimObjectValues(req.body)
  try {
    const user: any = await User.findOne({ where: { email }, include: [{ model: Player }, { model: Club }] })
    if (!user) return res.status(404).send('User not found')

    const resetCode: any = await ResetCode.findOne({ where: { email } })
    if (!resetCode) return res.status(404).send('Invalid or expired password reset code!')
    if (!(await bcrypt.compare(code, resetCode.code))) return res.status(404).send('Invalid or expired password reset code!')

    return res.send(resetCode)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const resetPassword = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const { email, code, password } = trimObjectValues(req.body)

  const user: any = await User.findOne({ where: { email }, include: [{ model: Player }, { model: Club }] })
  if (!user) return res.status(404).send('User not found')

  const resetCode: any = await ResetCode.findOne({ where: { email } })
  if (!resetCode) return res.status(404).send('Invalid or expired password reset code!')
  if (code !== resetCode.code) return res.status(404).send('Invalid or expired password reset code!')

  const validationResult = updateSchema.validate({ password, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedUser = await User.update({ ...req.body }, { where: { id: userId }, individualHooks: true })
    if (!updatedUser) return res.status(404).send('User not found!')

    // delete old or expired reset codes
    await deleteResetCodes(email)
    const result = await User.findByPk(userId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const changePassword = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const { oldPassword, newPassword } = trimObjectValues(req.body)

  const user: any = await User.findByPk(userId, {
    raw: true,
    attributes: {
      include: ['password'],
    },
  })
  if (!user) return res.status(404).send('User not found')

  const validationResult = passwordChangeSchema.validate({ userId, oldPassword, newPassword })
  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const passwordMatches = await bcrypt.compare(oldPassword, user.password)
    if (!passwordMatches) return res.status(400).send('Incorrect password!')

    const updatedUser = await User.update({ password: newPassword }, { where: { id: userId }, individualHooks: true })
    return res.send(updatedUser)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, userId })
  const { firstName, lastName, roleData: roleData = { firstName, lastName }, ...payload } = req.body

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const [, updatedUser]: any = await Promise.all([
      User.update({ ...payload }, { where: { id: userId }, individualHooks: true }),
      User.findByPk(userId, { raw: true }),
    ])
    if (!updatedUser) return res.status(404).send('User not found!')
    if (roleData && updatedUser.role) {
      if (updatedUser.role === 'Player') {
        await Player.update({ ...roleData }, { where: { UserId: userId } })
      } else {
        await Club.update({ ...roleData }, { where: { UserId: userId } })
      }
    }
    const result = await User.findByPk(userId, { include: [{ model: Player }, { model: Club }] })
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

export default {
  getAllUsers,
  getUserById,
  getFilteredUsers,
  registerUser,
  updateUser,
  deleteUser,
  requestResetPassword,
  validateResetPasswordCode,
  resetPassword,
  changePassword,
}
