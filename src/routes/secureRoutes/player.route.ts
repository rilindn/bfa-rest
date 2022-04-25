import express from 'express'
import PlayerController from '../../controllers/player.controller'

const router = express.Router()

router.get('/', PlayerController.getAllPlayers)

router.get('/:id', PlayerController.getPlayerById)

router.post('/', PlayerController.registerPlayer)

router.put('/:id', PlayerController.updatePlayer)

router.delete('/:id', PlayerController.deletePlayer)

export default router
