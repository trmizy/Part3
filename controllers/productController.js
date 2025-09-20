const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Display list of all products
exports.product_list = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.render('products/index', { 
      title: 'Products List', 
      products: products 
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error fetching products',
      error: error 
    });
  }
};

// Display product create form on GET
exports.product_create_get = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/new', { 
      title: 'Add New Product', 
      suppliers: suppliers 
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error loading suppliers',
      error: error 
    });
  }
};

// Handle product create on POST
exports.product_create_post = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      supplierID: req.body.supplierID
    });
    
    await product.save();
    res.redirect('/products');
  } catch (error) {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/new', { 
      title: 'Add New Product',
      error: error.message,
      product: req.body,
      suppliers: suppliers
    });
  }
};

// Display detail page for a specific product
exports.product_detail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('error', { 
        title: 'Error', 
        message: 'Product not found' 
      });
    }
    res.render('products/show', { 
      title: 'Product Details', 
      product: product 
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error fetching product details',
      error: error 
    });
  }
};

// Display product update form on GET
exports.product_update_get = async (req, res) => {
  try {
    const [product, suppliers] = await Promise.all([
      Product.findById(req.params.id),
      Supplier.find().sort({ name: 1 })
    ]);
    
    if (!product) {
      return res.status(404).render('error', { 
        title: 'Error', 
        message: 'Product not found' 
      });
    }
    
    res.render('products/edit', { 
      title: 'Edit Product', 
      product: product,
      suppliers: suppliers
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error fetching product for edit',
      error: error 
    });
  }
};

// Handle product update on POST
exports.product_update_post = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      supplierID: req.body.supplierID
    });
    res.redirect('/products/' + req.params.id);
  } catch (error) {
    const [product, suppliers] = await Promise.all([
      Product.findById(req.params.id),
      Supplier.find().sort({ name: 1 })
    ]);
    res.render('products/edit', { 
      title: 'Edit Product',
      error: error.message,
      product: product,
      suppliers: suppliers
    });
  }
};

// Handle product delete on POST
exports.product_delete_post = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error', 
      message: 'Error deleting product',
      error: error 
    });
  }
};