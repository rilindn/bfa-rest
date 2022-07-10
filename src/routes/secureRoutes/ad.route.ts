import express from 'express'
import AdController from '../../controllers/ad.controller'

const router = express.Router()

router.get('/', AdController.getAllAds)

router.get('/active', AdController.getAllActiveAds)

router.post('/', AdController.createAd)

router.put('/:id', AdController.updateAd)

router.delete('/:id', AdController.deleteAd)

export default router
