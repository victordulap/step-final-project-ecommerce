const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
  {
    cart: {
      type: Array,
      required: true,
    },
    shippingDetails: {
      type: Object,
      required: true,
    },
    paymentStatusSuccess: {
      type: Boolean,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
