import express from 'express'
import AdminController from '../../controllers/admin.controller'

const router = express.Router()

router.get('/', AdminController.getAllAdmins)

router.get('/:id', AdminController.getAdminById)

router.post('/', AdminController.registerAdmin)

router.put('/:id', AdminController.updateAdmin)

router.delete('/:id', AdminController.deleteAdmin)

export default router
