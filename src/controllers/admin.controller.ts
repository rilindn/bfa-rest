import Admin from '../models/admin.model'
import { adminRegisterSchema, adminUpdateSchema } from '../validators/admin.validation'
import { Request, Response } from 'express'
import User from '../models/user.model'
import Sequelize from 'sequelize'
import paginate from 'jw-paginate'
import trimObjectValues from '../helpers/trimObjectValues'

const Op = Sequelize.Op

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll({ where: { role: 'Admin' }, include: Admin })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getPaginatedAdmins = async (req: Request, res: Response) => {
  const { search = '', pageSize = 2, page = 1 }: any = req.query
  try {
    const result = await User.findAll({
      where: {
        [Op.or]: [
          { '$Admin.firstName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Admin.firstName')), 'LIKE', '%' + search.toLowerCase() + '%') },
          { '$Admin.lastName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Admin.lastName')), 'LIKE', '%' + search.toLowerCase() + '%') },
          { email: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', '%' + search.toLowerCase() + '%') },
        ],
        role: 'Admin',
        '$Admin.isSuperAdmin$': false,
      },
      include: Admin,
    })

    const pager = paginate(result.length, +page, +pageSize)
    const pageOfItems = result.slice(pager.startIndex, pager.endIndex + 1)

    return res.send({ pager, pageOfItems })
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
export default { getAllAdmins, getAdminById, getPaginatedAdmins, registerAdmin, updateAdmin, deleteAdmin }
