import React from 'react';
import './App.css';
import{ BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages'
import contactus from './pages/contactus'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/contactus" component={contactus} exact />
      </Switch>
    </Router>
  );
}

export default App;
