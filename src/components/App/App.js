import React from 'react';
import { Router, Link } from '@reach/router';
import { Home, Board } from '@components';
import './App.css';

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
          <NavLink to="board">Board</NavLink>
        </nav>
      </div>
      <Router className="container">
        <Home path="/" />
        <Board path="board" />
      </Router>
    </>
  );
};

export default App;
