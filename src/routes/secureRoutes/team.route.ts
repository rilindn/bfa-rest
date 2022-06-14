import express from 'express'
import TeamController from '../../controllers/team.controller'

const router = express.Router()

router.get('/no-team-players', TeamController.getNoTeamPlayers)

router.get('/:id', TeamController.getMyTeam)

router.post('/', TeamController.createTeamPlayer)

router.delete('/:id', TeamController.deleteTeamPlayer)

export default router
