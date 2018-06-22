import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="flex">
          {this.props.auth ? <Menu /> : null}
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated
});

export default withRouter(connect(mapStateToProps)(Layout));
