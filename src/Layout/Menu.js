import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  menuContainer: {
    minHeight: '100%',
    width: '20vw',
    background: '#fa6900'
  }
};

class Menu extends Component {
  render() {
    return (
      <nav style={styles.menuContainer}>
        <ul className="menu flex direction-column">
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
