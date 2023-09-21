import express from 'express'
import { UserController } from '../controllers/user'
import { CustomerController } from '../controllers/customer'
import { auth } from '../middlewares/auth'
import { SalePersonController } from '../controllers/salesperson'

const router = express.Router()

//user
router.get('/user', UserController.getUser)
router.get('/user/:email', UserController.getUserToken)
router.post('/user', auth, UserController.createUser)

//customer
router.get('/customer', CustomerController.getAllCustomer)

//salesperson
router.get('/sales-person', SalePersonController.getSalesPerson)
router.post('/sales-person', auth, SalePersonController.addSalesPerson)

export default router