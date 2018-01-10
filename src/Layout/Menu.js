import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  menuContainer: {
    height: '100vh',
    width: 200,
    background: '#fa6900'
  }
};

class Menu extends Component {
  render() {
    return (
      <nav style={styles.menuContainer}>
        <ul className="flex direction-column">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/projects">
            <li>Projects</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Menu;
