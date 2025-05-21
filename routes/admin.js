const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

//  USERS
router.get('/users/count',adminController.getUserCount);
router.delete('/users/:id',adminController.deleteUser);

//CATEGORY
router.post('/categories',adminController.addCategory);
router.post('/categories/:id',adminController.editCategory);
router.delete('/categories/:id',adminController.deleteCategory);

//ORDERS
router.get('/orders',adminController.getOrders);
router.get('/ordrs/count'.adminController.getOrderCount);
router.put('/orders/:id',adminController.changeOrderStatus);

//PRODUCTS
router.get('/products/count',adminController.getProductsCount);
router.post('/products',adminController.addProduct);
router.put('/products/:id',adminController.editProduct);
router.delete('/products/:id/images',adminController.deleteProductImages);
router.delete('products/:id',adminController.deleteProduct);