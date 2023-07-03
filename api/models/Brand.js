const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide brand name'],
  },
  imgUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Brand', BrandSchema);
