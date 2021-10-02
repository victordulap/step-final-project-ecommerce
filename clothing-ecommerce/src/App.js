import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { HomePage } from './pages/Home';
import { PageTwo } from './pages/Page2';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/page2" exact component={PageTwo} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
