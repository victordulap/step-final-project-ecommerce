require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./db/connect');
const categoryRoute = require('./routes/category');
const brandRoute = require('./routes/brand');
const itemRoute = require('./routes/item');
const orderRoute = require('./routes/order');
const authRoute = require('./routes/auth');

app.use(
  cors({
    origin: '*',
  })
);

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('ecommerce backend');
});

app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/items', itemRoute);
app.use('/api/v1/orders', orderRoute);

// back office routes
app.use('/api/v1/auth', authRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
