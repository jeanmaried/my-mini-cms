import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
