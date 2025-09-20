require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');

// Sample data
const sampleSuppliers = [
  {
    name: "Tech Solutions Inc.",
    address: "123 Technology Street, Silicon Valley, CA 94000",
    phone: "+1-555-0123"
  },
  {
    name: "Global Components Ltd.",
    address: "456 Industrial Avenue, Detroit, MI 48201",
    phone: "+1-555-0456"
  },
  {
    name: "Electronics Worldwide",
    address: "789 Commerce Boulevard, Austin, TX 73301",
    phone: "+1-555-0789"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Supplier.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert suppliers
    const suppliers = await Supplier.insertMany(sampleSuppliers);
    console.log('Suppliers added:', suppliers.length);

    // Insert products with supplier references
    const sampleProducts = [
      {
        name: "Laptop Pro 15",
        price: 1299.99,
        quantity: 25,
        supplierID: suppliers[0]._id
      },
      {
        name: "Wireless Mouse",
        price: 29.99,
        quantity: 100,
        supplierID: suppliers[0]._id
      },
      {
        name: "Mechanical Keyboard",
        price: 149.99,
        quantity: 50,
        supplierID: suppliers[1]._id
      },
      {
        name: "4K Monitor",
        price: 399.99,
        quantity: 15,
        supplierID: suppliers[1]._id
      },
      {
        name: "USB-C Hub",
        price: 79.99,
        quantity: 75,
        supplierID: suppliers[2]._id
      },
      {
        name: "Webcam HD",
        price: 89.99,
        quantity: 30,
        supplierID: suppliers[2]._id
      }
    ];

    const products = await Product.insertMany(sampleProducts);
    console.log('Products added:', products.length);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();