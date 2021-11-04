import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
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
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/:type/:id">
          <Shop />
        </Route>
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
