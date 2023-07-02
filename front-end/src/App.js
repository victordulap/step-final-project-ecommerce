import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { HomePage } from './pages/Home';
import Item from './pages/Item';
import Shop from './pages/Shop';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        {/* <Route path="/*">
          <main>
            <h1
              style={{
                fontSize: '5rem',
                textAlign: 'center',
                padding: '5rem 0',
              }}
            >
              404 not found
            </h1>
          </main>
        </Route> */}
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
