const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/productController');
const requireLogin = require('../middleware/auth');

// GET products homepage
router.get('/', product_controller.product_list);

// GET request for creating a product (form)
router.get('/new', requireLogin, product_controller.product_create_get);

// POST request for creating product
router.post('/', requireLogin, product_controller.product_create_post);

// GET request for updating a product (form)
router.get('/:id/edit', requireLogin, product_controller.product_update_get);

// POST request for updating product
router.post('/:id/edit', requireLogin, product_controller.product_update_post);

// POST request to delete product
router.delete('/:id', requireLogin, product_controller.product_delete_post);

// Lọc + tìm kiếm sản phẩm
router.get('/browse', product_controller.product_filter);

// GET request for one product (detail)
router.get('/:id', product_controller.product_detail);



module.exports = router;
