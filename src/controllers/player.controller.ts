import Player from '../models/player.model'
import { playerRegisterSchema, playerUpdateSchema } from '../validators/player.validation'
import { Request, Response } from 'express'
import User from './../models/user.model'
import trimObjectValues from '../helpers/trimObjectValues'
import Sequelize from 'sequelize'
import getBirthdateByAge from '../helpers/calcBirthdateByAge'

const Op = Sequelize.Op

const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const result = await User.findAll({ where: { role: 'Player' }, include: Player })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getPlayerById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return

    const result = await User.findByPk(id, { include: Player })
    if (!result) return res.status(404).send('Player not found')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getFilteredPlayers = async (req: any, res: any) => {
  try {
    const {
      position = '',
      gender = '',
      city = '',
      minWeight = 0,
      maxWeight = minWeight ? 150 : 0,
      minHeight = 0,
      maxHeight = minHeight ? 250 : 0,
      minAge = 0,
      maxAge = minAge ? 45 : 0,
      foot = '',
      nationality = '',
      exclude = '',
    } = req.query

    const minBirthDate = getBirthdateByAge(minAge)
    const maxBirthDate = getBirthdateByAge(maxAge)
    const excludeIds = exclude ? exclude.split(',') : []

    const items: any = await Player.findAll({
      where: {
        [Op.or]: [
          { nationality },
          { position },
          { secondPosition: position },
          { gender },
          { city },
          { foot },
          { weight: { [Op.between]: [minWeight, maxWeight] } },
          { height: { [Op.between]: [minHeight, maxHeight] } },
          { '$User.birthDate$': { [Op.between]: [maxBirthDate, minBirthDate] } },
        ],
        [Op.and]: [{ '$User.id$': { [Op.notIn]: excludeIds } }],
      },
      include: [{ model: User }],
    })

    return res.status(200).send(items)
  } catch (error) {
    console.log(error)
  }
}

const registerPlayer = async (req: Request, res: Response) => {
  const payload = trimObjectValues(req.body)
  const validationResult = playerRegisterSchema.validate({ ...payload })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }

  try {
    let { email, password, birthDate, role, profilePic, ...rest } = payload
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.create({ ...generals })
    await Player.create({ ...rest, UserId: user.id })

    const result = await User.findByPk(user.id, { include: Player })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updatePlayer = async (req: Request, res: Response) => {
  const userId = req.params.id
  const validationResult = playerUpdateSchema.validate({ ...req.body, userId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).send(errorMsg)
  }

  try {
    const { email, password, birthDate, role, profilePic, ...rest } = req.body
    const generals = { email, password, birthDate, role, profilePic }

    const user: any = await User.update({ ...generals }, { where: { id: userId }, individualHooks: true })
    const player = await Player.update({ ...rest }, { where: { UserId: userId } })

    if (!user || !player) return res.status(404).send('Player not found!')
    const result = await User.findByPk(userId, { include: Player })

    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deletePlayer = async (req: Request, res: Response) => {
  try {
    const result = await User.findByPk(req.params.id, { include: Player })
    if (!result) {
      return res.status(404).send('Player not found')
    } else {
      await result.destroy()
      return res.send(result)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getAllPlayers, getFilteredPlayers, getPlayerById, registerPlayer, updatePlayer, deletePlayer }
