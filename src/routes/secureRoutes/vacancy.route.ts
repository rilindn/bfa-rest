import express from 'express'
import VacancyController from '../../controllers/vacancy/vacancy.controller'

const router = express.Router()

router.get('/club/:id', VacancyController.getVacancyByClubsId)

router.get('/followings/:id', VacancyController.getMyFollowingsVacancies)

router.get('/:id', VacancyController.getVacancyById)

router.post('/', VacancyController.createVacancy)

router.put('/:id', VacancyController.editVacancy)

router.delete('/:id', VacancyController.deleteVacancy)

export default router
