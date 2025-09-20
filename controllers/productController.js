const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// List all products
exports.product_list = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 }).populate('supplier');
    res.render('products/index', { title: 'Products List', products });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error fetching products', error });
  }
};

// GET create form
exports.product_create_get = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/form', { 
      title: 'Add New Product', 
      suppliers, 
      product: null,
      formAction: '/products' 
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error loading suppliers', error });
  }
};

// POST create
exports.product_create_post = async (req, res) => {
  try {
    console.log("POST body:", req.body);

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      supplier: req.body.supplier
    });

    await product.save();
    console.log("Saved product:", product);

    res.redirect('/products');
  } catch (error) {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/form', { 
      title: 'Add New Product', 
      error: error.message, 
      product: req.body, 
      suppliers, 
      formAction: '/products' 
    });
  }
};

// Detail
exports.product_detail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier');
    if (!product) {
      return res.status(404).render('error', { title: 'Error', message: 'Product not found' });
    }
    res.render('products/show', { title: 'Product Details', product });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error fetching product details', error });
  }
};

// GET update form
exports.product_update_get = async (req, res) => {
  try {
    const [product, suppliers] = await Promise.all([
      Product.findById(req.params.id),
      Supplier.find().sort({ name: 1 })
    ]);

    if (!product) {
      return res.status(404).render('error', { title: 'Error', message: 'Product not found' });
    }

    res.render('products/form', { 
      title: 'Edit Product', 
      product, 
      suppliers, 
      formAction: `/products/${product._id}/edit` 
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error fetching product for edit', error });
  }
};

// POST update
exports.product_update_post = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        supplier: req.body.supplier
      },
      { runValidators: true }
    );
    res.redirect('/products/' + req.params.id);
  } catch (error) {
    const [product, suppliers] = await Promise.all([
      Product.findById(req.params.id),
      Supplier.find().sort({ name: 1 })
    ]);

    res.render('products/form', { 
      title: 'Edit Product', 
      error: error.message, 
      product, 
      suppliers, 
      formAction: `/products/${req.params.id}/edit` 
    });
  }
};

// POST delete
exports.product_delete_post = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).render('error', { title: 'Error', message: 'Product not found' });
    }
    res.redirect('/products');
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Error deleting product', error });
  }
};
// Trang danh sách sản phẩm với lọc và tìm kiếm
exports.product_filter = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });

    // Lấy query từ URL
    const supplierFilter = req.query.supplier || "";
    const searchQuery = req.query.search || "";

    let filter = {};

    if (supplierFilter) {
      filter.supplier = supplierFilter;
    }
    if (searchQuery) {
      filter.name = { $regex: searchQuery, $options: "i" }; // tìm kiếm không phân biệt hoa/thường
    }

    const products = await Product.find(filter).populate("supplier").sort({ name: 1 });

    res.render("products/filter", {
      title: "Browse Products",
      suppliers,
      products,
      supplierFilter,
      searchQuery
    });
  } catch (error) {
    res.status(500).render("error", { title: "Error", message: "Error fetching products", error });
  }
};
