import Admin from '../models/admin.model'
import { adminRegisterSchema, adminUpdateSchema } from '../validators/admin.validation'
import { Request, Response } from 'express'
import User from '../models/user.model'
import trimObjectValues from '../helpers/trimObjectValues'

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const result = await Admin.findAll()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getAdminById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await User.findByPk(id, { include: Admin })
    if (!result) return res.status(404).send('Admin not found!')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerAdmin = async (req: Request, res: Response) => {
  const payload = trimObjectValues(req.body)
  const validationResult = adminRegisterSchema.validate({ ...payload })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }

  try {
    let { email, password, birthDate, role, profilePic, ...rest } = payload
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.create({ ...generals })
    await Admin.create({ ...rest, UserId: user.id })

    const result = await User.findByPk(user.id, { include: Admin })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateAdmin = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = adminUpdateSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).send(errorMsg)
  }

  try {
    const { email, password, birthDate, role, profilePic, ...rest } = req.body
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.update({ ...generals }, { where: { id: userId }, individualHooks: true })
    const admin = await Admin.update({ ...rest }, { where: { UserId: userId } })

    if (!user || !admin) return res.status(404).send('Admin not found!')
    const result = await User.findByPk(userId, { include: Admin })

    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const result = await User.findByPk(req.params.id, { include: Admin })
    if (!result) {
      return res.status(404).send('Admin not found')
    } else {
      await result.destroy()
      return res.send(result)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}
export default { getAllAdmins, getAdminById, registerAdmin, updateAdmin, deleteAdmin }
