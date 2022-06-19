import express from 'express'
import BookmarkController from '../../controllers/bookmark.controller'

const router = express.Router()

router.get('/:id', BookmarkController.getMyBookmarks)

router.post('/', BookmarkController.createBookmark)

router.delete('/:id', BookmarkController.removeBookmark)

export default router
