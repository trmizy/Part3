const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

// List
exports.supplier_list = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('suppliers/index', { title: 'Suppliers List', suppliers });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error fetching suppliers', error });
  }
};

// GET create form
exports.supplier_create_get = (req, res) => {
  res.render('suppliers/new', { title: 'Add New Supplier' });
};

// POST create
exports.supplier_create_post = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.redirect('/suppliers');
  } catch (error) {
    res.render('suppliers/new', { title: 'Add New Supplier', error: error.message, supplier: req.body });
  }
};

// Detail (show supplier + their products)
exports.supplier_detail = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).render('error', { title: 'Error', message: 'Supplier not found' });
    }
    const products = await Product.find({ supplierID: supplier._id });
    res.render('suppliers/show', { title: 'Supplier Details', supplier, products });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error fetching supplier details', error });
  }
};

// GET update form
exports.supplier_update_get = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).render('error', { title: 'Error', message: 'Supplier not found' });
    }
    res.render('suppliers/edit', { title: 'Edit Supplier', supplier });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error fetching supplier for edit', error });
  }
};

// POST update
exports.supplier_update_post = async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect('/suppliers/' + req.params.id);
  } catch (error) {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/edit', { title: 'Edit Supplier', error: error.message, supplier });
  }
};

// POST delete
exports.supplier_delete_post = async (req, res) => {
  try {
    const count = await Product.countDocuments({ supplierID: req.params.id });
    if (count > 0) {
      return res.status(400).render('error', { 
        title: 'Error', 
        message: 'Cannot delete supplier with existing products' 
      });
    }
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error deleting supplier', error });
  }
};
