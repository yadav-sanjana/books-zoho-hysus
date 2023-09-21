import express from 'express'
import { UserController } from '../controllers/user'
import { CustomerController } from '../controllers/customer'

const router = express.Router()

router.get('/', UserController.getUser)
router.get('/customer', CustomerController.getAllCustomer)


export default router