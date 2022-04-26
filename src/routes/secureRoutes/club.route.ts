import express from 'express'
import ClubController from '../../controllers/club.controller'

const router = express.Router()

router.get('/', ClubController.getAllClubs)

router.get('/:id', ClubController.getClubById)

router.put('/:id', ClubController.updateClub)

router.delete('/:id', ClubController.deleteClub)

export default router
