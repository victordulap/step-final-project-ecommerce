const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please provide item title'],
  },
  brandId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Brand',
    required: true,
  },
  categoryIds: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Category',
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Item', CategorySchema);
