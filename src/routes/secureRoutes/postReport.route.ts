import express from 'express'
import PostReportController from '../../controllers/postReport.controller'

const router = express.Router()

router.get('/', PostReportController.getAllReports)

//router.get('/:id', PostReportController.getPostReports)

router.post('/', PostReportController.createReport)

router.delete('/:id', PostReportController.deleteReport)

export default router   