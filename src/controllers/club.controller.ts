import Club from '../models/club.model'
import { clubRegisterSchema, clubUpdateSchema } from '../validators/club.validation'
import { Request, Response } from 'express'
import User from '../models/user.model'
import Sequelize from 'sequelize'
import paginate from 'jw-paginate'
import trimObjectValues from '../helpers/trimObjectValues'

const Op = Sequelize.Op

const getAllClubs = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll({ where: { role: 'Club' }, include: Club })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getPaginatedClubs = async (req: Request, res: Response) => {
  const { search = '', pageSize = 2, page = 1 }: any = req.query
  try {
    const result = await User.findAll({
      where: {
        [Op.or]: [
          { '$Club.firstName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Club.firstName')), 'LIKE', '%' + search.toLowerCase() + '%') },
          { '$Club.lastName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Club.lastName')), 'LIKE', '%' + search.toLowerCase() + '%') },
          { '$Club.clubName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Club.clubName')), 'LIKE', '%' + search.toLowerCase() + '%') },
          { email: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', '%' + search.toLowerCase() + '%') },
        ],
        role: 'Club',
      },
      include: Club,
    })

    const pager = paginate(result.length, +page, +pageSize)
    const pageOfItems = result.slice(pager.startIndex, pager.endIndex + 1)

    return res.send({ pager, pageOfItems })
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getClubById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return
    const result = await User.findByPk(id, { include: Club })
    if (!result) return res.status(404).send('Club not found!')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerClub = async (req: Request, res: Response) => {
  const payload = trimObjectValues(req.body)
  const validationResult = clubRegisterSchema.validate({ ...payload })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }

  try {
    let { email, password, birthDate, role, profilePic, ...rest } = payload
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.create({ ...generals })
    await Club.create({ ...rest, UserId: user.id })

    const result = await User.findByPk(user.id, { include: Club })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateClub = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = clubUpdateSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).send(errorMsg)
  }

  try {
    const { email, password, birthDate, role, profilePic, ...rest } = req.body
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.update({ ...generals }, { where: { id: userId }, individualHooks: true })
    const club = await Club.update({ ...rest }, { where: { UserId: userId } })

    if (!user || !club) return res.status(404).send('Club not found!')
    const result = await User.findByPk(userId, { include: Club })

    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteClub = async (req: Request, res: Response) => {
  try {
    const result = await User.findByPk(req.params.id, { include: Club })
    if (!result) {
      return res.status(404).send('Club not found')
    } else {
      await result.destroy()
      return res.send(result)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}
export default { getAllClubs, getClubById, getPaginatedClubs, registerClub, updateClub, deleteClub }
