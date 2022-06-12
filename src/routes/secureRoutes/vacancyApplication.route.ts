import express from 'express'
import VacancyApplicationController from '../../controllers/vacancyApplication.controller'

const router = express.Router()

router.get('/:id', VacancyApplicationController.getApplicatonByVacancyId)

router.post('/', VacancyApplicationController.createApplication)

router.put('/:id', VacancyApplicationController.editApplication)

router.delete('/:id', VacancyApplicationController.deleteApplication)

export default router
