import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import ContactPage from './pages/contactus';

function App() {
  return (
    <Router basename="/Saba-Digital">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/contactus" component={ContactPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
