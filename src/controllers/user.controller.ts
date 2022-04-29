import User from '../models/user.model'
import { registerSchema, updateSchema } from '../validators/user.validation'
import { Request, Response } from 'express'
import sendEmail from '../utils/email/sendEmail'
import crypto from 'crypto'
import ResetCode from '../models/resetCode.model'
import bcrypt from 'bcrypt'
import Player from '../models/player.model'
import Club from '../models/club.model'
import Sequelize from 'sequelize'
import deleteResetCodes from '../helpers/deleteExpiredResetCodes'

const Op = Sequelize.Op

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

const requestResetPassword = async (req: Request, res: Response) => {
  const email = req.body.email
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
  const { email, code } = req.body
  try {
    const user: any = await User.findOne({ where: { email }, include: [{ model: Player }, { model: Club }] })
    if (!user) return res.status(404).send('User not found')

    const resetCode: any = await ResetCode.findOne({ where: { email } })
    if (!resetCode) return res.status(404).send('Invalid or expired password reset code!')
    if (!(await bcrypt.compare(code, resetCode.code))) return res.status(404).send('Invalid or expired password reset code!')

    // delete old or expired reset codes
    await deleteResetCodes(email)
    return res.send('You can continue setting your new password!')
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

export default { getAllUsers, getUserById, registerUser, updateUser, deleteUser, requestResetPassword, validateResetPasswordCode }
