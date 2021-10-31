require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const categoryRoute = require('./routes/category');

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
