const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  supplierID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Supplier is required']
  }
}, {
  timestamps: true
});

// Virtual for product's URL
productSchema.virtual('url').get(function() {
  return `/products/${this._id}`;
});

// Pre-populate supplier information when querying
productSchema.pre(/^find/, function(next) {
  this.populate('supplierID', 'name address phone');
  next();
});

module.exports = mongoose.model('Product', productSchema);