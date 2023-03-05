import express from 'express'
const router = express.Router({ mergeParams: true })
import asyncHandler from 'express-async-handler'
import SectionController from './SectionController'

router.post('/', asyncHandler(SectionController.register()))

router.get('/', asyncHandler(SectionController.getAll()))

router.get('/:id', asyncHandler(SectionController.getOne()))

router.get('/:id/items', asyncHandler(SectionController.getItemsForSection()))

router.put('/:id', asyncHandler(SectionController.edit()))

router.delete('/:id', asyncHandler(SectionController.delete()))

export default router
