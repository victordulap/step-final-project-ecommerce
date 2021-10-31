const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide category name'],
  },
  imgUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
