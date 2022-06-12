import { registerSchema, updateSchema } from '../validators/vacancyApplication.validation'
import { Request, Response } from 'express'
import Sequelize from 'sequelize'
import User from '../models/user.model'
import Player from '../models/player.model'
import VacancyApplication from '../models/vacancyApplication.model'

const getApplicatonByVacancyId = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return

    const result = await VacancyApplication.findAll({
      order: [['createdAt', 'DESC']],
      where: { VacancyId: id },
      include: [{ model: User, include: [{ model: Player }] }],
    })

    if (!result) return res.status(404).send('No vacancies found!')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createApplication = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(404).send({ error: errorMsg })
  }

  try {
    const result = await VacancyApplication.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const editApplication = async (req: Request, res: Response) => {
  const applicationId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, applicationId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const editApplication: any = await VacancyApplication.update({ ...req.body }, { where: { id: applicationId } })
    if (!editApplication) return res.status(404).send('Vacancy Application application not found!')
    const result = await VacancyApplication.findByPk(applicationId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteApplication = async (req: Request, res: Response) => {
  try {
    const result = await VacancyApplication.findByPk(req.params.id)
    if (!result) return res.status(404).send('Vacancy Application not found')

    await result.destroy()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getApplicatonByVacancyId, createApplication, editApplication, deleteApplication }
