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
    isShipped: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
