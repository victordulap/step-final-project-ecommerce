import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './util/PrivateRoute';
import { Typography } from 'antd';
import './App.css';
import Items from './pages/Items/Items';
import Item from './pages/Items/Item';
import Brands from './pages/Brands/Brands';
import Categories from './pages/Categories/Categories';
import Orders from './pages/Orders/Orders';
import Category from './pages/Categories/Category';
import Brand from './pages/Brands/Brand';
import Order from './pages/Orders/Order';
import AddBrand from './pages/Brands/AddBrand';

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div className="welcome-container">
                  <Title className="welcome-message" level="1">
                    Welcome admin!
                  </Title>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/items"
            element={
              <PrivateRoute>
                <Items />
              </PrivateRoute>
            }
          />
          <Route
            path="/items/:id"
            element={
              <PrivateRoute>
                <Item />
              </PrivateRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <PrivateRoute>
                <Brands />
              </PrivateRoute>
            }
          />
          <Route
            path="/brands/add"
            element={
              <PrivateRoute>
                <AddBrand />
              </PrivateRoute>
            }
          />
          <Route
            path="/brands/:brandId"
            element={
              <PrivateRoute>
                <Brand />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/:categoryId"
            element={
              <PrivateRoute>
                <Category />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/:orderId"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <p style={{ textAlign: 'center', padding: '5em 0', fontSize: '3rem' }}>404 not found</p>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
