import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { HomePage } from './pages/Home';
import Item from './pages/Item';
import Shop from './pages/Shop';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/shop/search?=:query">
          <Shop />
        </Route>
        <Route path="/:type/:name">
          <Shop />
        </Route>
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
