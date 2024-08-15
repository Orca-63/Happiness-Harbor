import express from 'express';
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, updateProfileController } from '../controllers/authenticationController.js';
import { registerController } from '../controllers/authenticationController.js'
import { testController } from '../controllers/authenticationController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerController);
router.get('/test', requireSignIn, isAdmin, testController);
router.post('/forgot-password', forgotPasswordController);
router.post('/login', loginController);
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

router.put('/profile', requireSignIn, updateProfileController)

router.get('/orders', requireSignIn, getOrdersController);

router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)
export default router
