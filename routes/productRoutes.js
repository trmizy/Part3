const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/productController');

// GET products homepage
router.get('/', product_controller.product_list);

// GET request for creating a product
router.get('/new', product_controller.product_create_get);

// POST request for creating product
router.post('/new', product_controller.product_create_post);

// GET request to delete product
router.get('/:id/delete', product_controller.product_delete_post);

// POST request to delete product
router.post('/:id/delete', product_controller.product_delete_post);

// GET request to update product
router.get('/:id/edit', product_controller.product_update_get);

// POST request to update product
router.post('/:id/edit', product_controller.product_update_post);

// GET request for one product
router.get('/:id', product_controller.product_detail);

module.exports = router;