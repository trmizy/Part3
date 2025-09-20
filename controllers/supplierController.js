const Supplier = require('../models/Supplier');

// Display list of all suppliers
exports.supplier_list = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('suppliers/index', { 
      title: 'Suppliers List', 
      suppliers: suppliers 
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error fetching suppliers',
      error: error 
    });
  }
};

// Display supplier create form on GET
exports.supplier_create_get = (req, res) => {
  res.render('suppliers/new', { title: 'Add New Supplier' });
};

// Handle supplier create on POST
exports.supplier_create_post = async (req, res) => {
  try {
    const supplier = new Supplier({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    });
    
    await supplier.save();
    res.redirect('/suppliers');
  } catch (error) {
    res.render('suppliers/new', { 
      title: 'Add New Supplier',
      error: error.message,
      supplier: req.body
    });
  }
};

// Display detail page for a specific supplier
exports.supplier_detail = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).render('error', { 
        title: 'Error', 
        message: 'Supplier not found' 
      });
    }
    res.render('suppliers/show', { 
      title: 'Supplier Details', 
      supplier: supplier 
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error fetching supplier details',
      error: error 
    });
  }
};

// Display supplier update form on GET
exports.supplier_update_get = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).render('error', { 
        title: 'Error', 
        message: 'Supplier not found' 
      });
    }
    res.render('suppliers/edit', { 
      title: 'Edit Supplier', 
      supplier: supplier 
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error fetching supplier for edit',
      error: error 
    });
  }
};

// Handle supplier update on POST
exports.supplier_update_post = async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    });
    res.redirect('/suppliers/' + req.params.id);
  } catch (error) {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/edit', { 
      title: 'Edit Supplier',
      error: error.message,
      supplier: supplier
    });
  }
};

// Handle supplier delete on POST
exports.supplier_delete_post = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error deleting supplier',
      error: error 
    });
  }
};