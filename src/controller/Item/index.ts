import express from 'express'
const router = express.Router({ mergeParams: true })
import asyncHandler from 'express-async-handler'
import ItemController from './ItemController'

router.post('/', asyncHandler(ItemController.register()))

router.get('/', asyncHandler(ItemController.getAll()))

router.get('/:id', asyncHandler(ItemController.getOne()))

router.put('/:id', asyncHandler(ItemController.edit()))

router.delete('/:id', asyncHandler(ItemController.delete()))

router.get('/:id/modifiers', asyncHandler(ItemController.getModifiersForItem()))

router.put(
  '/:id/modifiers/:modifierId',
  asyncHandler(ItemController.mapItemToModifier())
)

export default router
