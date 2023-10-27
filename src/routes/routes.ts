import express from 'express'
import { UserController } from '../controllers/user'
import { CustomerController } from '../controllers/customer'
import { auth } from '../middlewares/auth'
import { SalePersonController } from '../controllers/salesperson'
import { InvoiceController, ItemController, TermController } from '../controllers/invoice'
import { singleUpload } from '../config/fileStorage'
import { RoleController } from '../controllers/role'

const router = express.Router()

//user
router.get('/user', UserController.getUser)
router.get('/user/:email', UserController.getUserToken)
router.post('/user', auth, UserController.createUser)
router.post('/company', auth, UserController.addCompanyDetail)
router.get('/user-info', auth, UserController.getUserByToken)

//customer
router.get('/customer', CustomerController.getAllCustomer)
router.post('/customer', CustomerController.createCustomer)
router.get('/customer/:id', CustomerController.getSingleCustomer)
router.patch('/customer/:id', CustomerController.updateCustomer)

//salesperson
router.get('/sales-person', SalePersonController.getSalesPerson)
router.post('/sales-person', auth, SalePersonController.addSalesPerson)

//terms
router.get('/terms', TermController.allTerms)
router.post('/terms', auth, TermController.createTerm)

//invoice
router.get('/invoice', InvoiceController.getAllInvoiceList)
router.get('/invoice/:id', InvoiceController.getInvoiceById)
router.post('/invoice', auth, singleUpload, InvoiceController.createInvoice)

//item in cart 
router.post('/add-item/:id', ItemController.addItem)
router.patch('/add-item/:id', ItemController.updateCartItem)
router.get('/item/:id', ItemController.fetchItems)
router.get('/cart-item/:item_id', ItemController.fetchSingleItem)

//roles
router.post('/role', RoleController.createRole)
router.get('/role', RoleController.fetchRoles)
router.get('/role/:id', RoleController.roleById)

//cart
router.patch('/cart/:id', ItemController.updateCart)

export default router
