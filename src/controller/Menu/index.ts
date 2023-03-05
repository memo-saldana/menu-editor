import express from 'express'
const router = express.Router({ mergeParams: true })
import asyncHandler from 'express-async-handler'
import MenuController from './MenuController'

router.get('/', asyncHandler(MenuController.getMenu()))

export default router
