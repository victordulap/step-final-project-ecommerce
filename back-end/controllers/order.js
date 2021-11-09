const Order = require('../models/Order');
const transporter = require('../utils/emailTransporter');

const getAllOrders = async (req, res) => {
  let result = Order.find({});

  const orders = await result;
  res.status(200).json({ orders, nbHits: orders.length });
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);

  const { shippingDetails, total, cart } = req.body;

  const cartLength = cart.reduce((prev, curr) => prev + curr.count, 0);

  const mailData = {
    from: 'vdclothes.step@gmail.com', // sender address
    to: shippingDetails.email, // list of receivers
    subject: 'Your order at VD clothes',
    text: 'Your order at VD clothes',
    html: `
      <h1>Thanks ${shippingDetails.firstName} ${shippingDetails.lastName} for ordering at VD clothes</h1>
      <p>Your total for the order is: ${total}$ for ${cartLength} items!</p>
      <br/>
      <p>Order will be delieverd to ${shippingDetails.country}, ${shippingDetails.city}, ${shippingDetails.postcode} by 30 days.</p>
      <br/>
      <p>For more information, contact vdclothes.step@gmail.com</p>
    `,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);
    res.status(201).json({ order, email: info });
  });
};

module.exports = {
  getAllOrders,
  createOrder,
};
