const express = require('express');
const router = express.Router();
const supplier_controller = require('../controllers/supplierController');
const requireLogin = require('../middleware/auth');

// GET suppliers homepage
router.get('/', supplier_controller.supplier_list);

// GET request for creating a supplier (form)
router.get('/new', requireLogin, supplier_controller.supplier_create_get);

// POST request for creating supplier
router.post('/new', requireLogin, supplier_controller.supplier_create_post);

// GET request for updating a supplier (form)
router.get('/:id/edit', requireLogin, supplier_controller.supplier_update_get);

// POST request for updating supplier
router.post('/:id/edit', requireLogin, supplier_controller.supplier_update_post);

// POST request to delete supplier
router.post('/:id/delete', requireLogin, supplier_controller.supplier_delete_post);

// GET request for one supplier (detail)
router.get('/:id', supplier_controller.supplier_detail);

module.exports = router;
