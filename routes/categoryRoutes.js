import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'

import { categoryController, createCategoryController, deleteCategoryController, singleCategoryontroller, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

router.get('/get-category/', categoryController)

router.get('/single-category/:slug', singleCategoryontroller)

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);
export default router