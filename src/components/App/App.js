import React from 'react';
import { Router, Link } from '@reach/router';
import { Home, Desk } from '@components';
import './default.css';

const NavLink = (props) => (
  <Link
    { ...props }
    getProps={ ({ isCurrent }) => { return isCurrent ? { className: 'active' } : null; } }
  />
);

const App = () => {
  return (
    <>
      <div className="navigation-bar">
        <nav className="navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="desk">Your Desk</NavLink>
        </nav>
      </div>
      <Router className="container">
        <Home path="/" pr={ 123 } />
        <Desk path="desk" />
      </Router>
    </>
  );
};

export default App;
