const express = require('express');
const router = express.Router();
const supplier_controller = require('../controllers/supplierController');

// GET suppliers homepage
router.get('/', supplier_controller.supplier_list);

// GET request for creating a supplier
router.get('/new', supplier_controller.supplier_create_get);

// POST request for creating supplier
router.post('/new', supplier_controller.supplier_create_post);

// GET request to delete supplier
router.get('/:id/delete', supplier_controller.supplier_delete_post);

// POST request to delete supplier
router.post('/:id/delete', supplier_controller.supplier_delete_post);

// GET request to update supplier
router.get('/:id/edit', supplier_controller.supplier_update_get);

// POST request to update supplier
router.post('/:id/edit', supplier_controller.supplier_update_post);

// GET request for one supplier
router.get('/:id', supplier_controller.supplier_detail);

module.exports = router;