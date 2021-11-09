const Order = require('../models/Order');
const transporter = require('../utils/emailTransporter');

const getAllOrders = async (req, res) => {
  let result = Order.find({});

  const orders = await result;
  res.status(200).json({ orders, nbHits: orders.length });
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);

  const mailData = {
    from: 'vdclothes.step@gmail.com', // sender address
    to: req.body.shippingDetails.email, // list of receivers
    subject: 'Your order at VD clothes',
    text: 'Your order at VD clothes',
    html: '<b>Your order at VD clothes </b><br> This is our first message sent with Nodemailer<br/>',
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
