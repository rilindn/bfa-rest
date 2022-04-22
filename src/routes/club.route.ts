import express from 'express'
import ClubController from '../controllers/club.controller'

const router = express.Router()

// GET - users
router.get('/', ClubController.getAllClubs)

// GET - users/:id
router.get('/:id', ClubController.getClubById)

// POST - users
router.post('/', ClubController.registerClub)

// PUT - users/:id
router.put('/:id', ClubController.updateClub)

// DELETE - users/:id
router.delete('/:id', ClubController.deleteClub)

export default router
