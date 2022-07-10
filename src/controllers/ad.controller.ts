import { registerSchema, updateSchema } from '../validators/ad.validation'
import { Request, Response } from 'express'
import Ad from './../models/ad.model'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const getAllAds = async (req: Request, res: Response) => {
  try {
    const result = await Ad.findAll({ order: [['updatedAt', 'DESC']] })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getAllActiveAds = async (req: Request, res: Response) => {
  try {
    const result = await Ad.findAll({ where: { active: true } })
    if (!result) return res.status(404).send('Ad not found')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createAd = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send({ error: errorMsg })
  }

  try {
    const result = await Ad.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateAd = async (req: Request, res: Response) => {
  const adId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, adId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedPost: any = await Ad.update({ ...req.body }, { where: { id: adId } })
    if (!updatedPost) return res.status(404).send('Ad not found!')
    const result = await Ad.findByPk(adId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteAd = async (req: Request, res: Response) => {
  try {
    const result = await Ad.findByPk(req.params.id)
    if (!result) return res.status(404).send('Ad not found')

    await result.destroy()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getAllAds, getAllActiveAds, createAd, updateAd, deleteAd }
