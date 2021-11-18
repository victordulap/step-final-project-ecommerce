import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './util/PrivateRoute';
import { Typography } from 'antd';
import './App.css';
import Items from './pages/Items/Items';
import Brands from './pages/Brands/Brands';

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
            path="/brands"
            element={
              <PrivateRoute>
                <Brands />
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
