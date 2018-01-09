import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <nav>
        <ul className="flex direction-column">
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/projects">
            <li>Projects</li>
          </Link>
          {/* <li>Chat</li> */}
        </ul>
      </nav>
    );
  }
}

export default Menu;
