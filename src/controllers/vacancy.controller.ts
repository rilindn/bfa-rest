import { registerSchema, updateSchema } from '../validators/vacancy.validation'
import { Request, Response } from 'express'
import Vacancy from '../models/vacancy.model'
import Sequelize from 'sequelize'
import Follow from '../models/follow.model'
import Club from '../models/club.model'
import User from '../models/user.model'

const Op = Sequelize.Op

const getVacancyByClubsId = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return

    const result = await Vacancy.findAll({
      where: { ClubId: id },
      include: [{ model: Club, include: [{ model: User }] }],
    })
    if (!result) return res.status(404).send('No vacancies found!')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getMyFollowingsVacancies = async (req: any, res: any) => {
  try {
    const id = req.params.id
    const followings: any = await Follow.findAll({
      raw: true,
      where: {
        followerId: id,
      },
    })
    if (!followings) return res.status(404).send('No vacancies found')
    const followingsIds: any = await Promise.all(
      followings.map(async (follow: any) => {
        const club: any = await Club.findOne({ where: { UserId: follow.followedId } })
        if (club?.clubId) return club.clubId
      }),
    )

    const vacancies: any = await Vacancy.findAll({
      order: [['updatedAt', 'DESC']],
      include: [{ model: Club, include: [{ model: User }] }],
      where: {
        ClubId: {
          [Op.in]: followingsIds,
        },
      },
    })

    return res.status(200).send(vacancies)
  } catch (error) {
    console.log(error)
  }
}

const getVacancyById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return

    const result = await Vacancy.findByPk(id)
    if (!result) return res.status(404).send('Vacancy not found')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createVacancy = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(404).send({ error: errorMsg })
  }

  try {
    const result = await Vacancy.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const editVacancy = async (req: Request, res: Response) => {
  const vacancyId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, vacancyId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const editVacancy: any = await Vacancy.update({ ...req.body }, { where: { id: vacancyId } })
    if (!editVacancy) return res.status(404).send('Vacancy not found!')
    const result = await Vacancy.findByPk(vacancyId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteVacancy = async (req: Request, res: Response) => {
  try {
    const result = await Vacancy.findByPk(req.params.id)
    if (!result) return res.status(404).send('Vacancy not found')

    await result.destroy()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { createVacancy, getVacancyById, editVacancy, deleteVacancy, getMyFollowingsVacancies, getVacancyByClubsId }
