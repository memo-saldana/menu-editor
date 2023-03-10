import express from 'express'
const router = express.Router({ mergeParams: true })
import asyncHandler from 'express-async-handler'
import ModifierController from './ModifierController'

router.post('/', asyncHandler(ModifierController.register()))

router.get('/', asyncHandler(ModifierController.getAll()))

router.get('/:id', asyncHandler(ModifierController.getOne()))

router.put('/:id', asyncHandler(ModifierController.edit()))

router.delete('/:id', asyncHandler(ModifierController.delete()))

router.get('/:id/items', asyncHandler(ModifierController.getItemsForModifier()))

router.put(
  '/:id/items/:itemId',
  asyncHandler(ModifierController.mapModifierToItem())
)

export default router
