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
    const result = await Ad.findAll({ where: { active: true }, order: [['order', 'ASC']] })
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

const incrementClicks = async (req: Request, res: Response) => {
  const adId = req.params.id

  try {
    const ad: any = await Ad.findByPk(adId)
    if (!ad) return res.status(404).send('Ad not found!')
    const result = await ad.increment('clicks', { by: 1 })
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const incrementViews = async (req: Request, res: Response) => {
  const adId = req.params.id

  try {
    const ad: any = await Ad.findByPk(adId)
    if (!ad) return res.status(404).send('Ad not found!')
    const result = await ad.increment('views', { by: 1 })
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
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
    const updatedAd: any = await Ad.update({ ...req.body }, { where: { id: adId } })
    if (!updatedAd) return res.status(404).send('Ad not found!')
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

export default { getAllAds, getAllActiveAds, createAd, updateAd, incrementClicks, incrementViews, deleteAd }
