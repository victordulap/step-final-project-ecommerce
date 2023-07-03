const { NotFoundError } = require('../errors');
const Order = require('../models/Order');
const transporter = require('../utils/emailTransporter');

const getAllOrders = async (req, res) => {
  let result = Order.find({});

  const orders = await result;
  res.status(200).json({ orders, nbHits: orders.length });
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  let result = Order.findById(id);
  const order = await result;
  res.status(200).json({ order });
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);

  const { shippingDetails, total, cart } = req.body;

  const cartLength = cart.reduce((prev, curr) => prev + curr.count, 0);

  const mailDataCustomer = {
    from: 'vdclothes.step@gmail.com', // sender address
    to: shippingDetails.email, // list of receivers
    subject: 'Your order at VD clothes',
    text: 'Your order at VD clothes',
    html: `
      <h1>Thanks ${shippingDetails.firstName} ${shippingDetails.lastName} for ordering at VD clothes</h1>
      <p>Your total for the order is: ${total}$ for ${cartLength} items!</p>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
        <tr>
          <th style="border: 1px solid black;">item</th>
          <th style="border: 1px solid black;">size</th>
          <th style="border: 1px solid black;">qty</th>
          <th style="border: 1px solid black;">price</th>
        </tr>
        ${cart
          .map((cartItem) => {
            return `<tr><td style="border: 1px solid black;">${cartItem.itemName}</td><td style="border: 1px solid black;">${cartItem.selectedSize}</td><td style="border: 1px solid black;">${cartItem.count}</td><td style="border: 1px solid black;">${cartItem.price}</td></tr>`;
          })
          .join(' ')}
      </table>
      <br/>
      <p>Order will be delieverd to ${shippingDetails.country}, ${shippingDetails.city}, ${shippingDetails.postcode} by 30 days.</p>
      <br/>
      <p>For more information, contact vdclothes.step@gmail.com</p>
    `,
  };
  const mailDataOperator = {
    from: 'vdclothes.step@gmail.com', // sender address
    to: 'vdclothes.operator.step@gmail.com', // list of receivers
    subject: 'New order',
    text: 'New order',
    html: `
      <h1>New order by ${shippingDetails.firstName} ${shippingDetails.lastName} (${shippingDetails.email})</h1>
      <p>Order total: ${total}$ (${cartLength} items)</p>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
        <tr>
          <th style="border: 1px solid black;">item</th>
          <th style="border: 1px solid black;">size</th>
          <th style="border: 1px solid black;">qty</th>
          <th style="border: 1px solid black;">price</th>
        </tr>
        ${cart
          .map((cartItem) => {
            return `<tr><td style="border: 1px solid black;">${cartItem.itemName}</td><td style="border: 1px solid black;">${cartItem.selectedSize}</td><td style="border: 1px solid black;">${cartItem.count}</td><td style="border: 1px solid black;">${cartItem.price}</td></tr>`;
          })
          .join(' ')}
      </table>
      <br/>
      <p>Shipping details: ${shippingDetails.country}, ${shippingDetails.city}, ${shippingDetails.postcode}</p>
    `,
  };

  transporter.sendMail(mailDataOperator, (err, info) => {
    if (err) console.log(err);
  });

  transporter.sendMail(mailDataCustomer, (err, info) => {
    if (err) console.log(err);
    res.status(201).json({ order, email: info });
  });
  // res.status(201).json({ order, cart });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    throw new NotFoundError(`No order with id : ${id}`);
  }

  res.status(200).json({ order });
};

const removeOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOneAndDelete({ _id: id });
  if (!order) {
    throw new NotFoundError(`No order with id : ${id}`);
  }

  res.status(200).json({ order });
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  removeOrder,
};
