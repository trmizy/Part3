const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  const suppliers = await Supplier.find();
  const search = req.query.search || '';
  const supplierFilter = req.query.supplier || '';

  let query = {};
  if (search) {
    query.name = new RegExp(search, 'i');
  }
  if (supplierFilter) {
    query.supplier = supplierFilter;
  }

  const products = await Product.find(query).populate('supplier');
  res.render('index', { 
    title: 'Home', 
    products, 
    suppliers, 
    search, 
    supplierFilter 
  });
});

module.exports = router;
