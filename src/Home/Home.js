import React, { Component } from 'react';
import { connect } from 'react-redux';

const styles = {
  home: {
    width: '100%',
    margin: '20vh'
  },

  profilePicContainer: {
    padding: 50,
    width: 130,
    height: 130
  },

  img: {
    borderRadius: '50%',
    maxWidth: '100%'
  }
};

class Home extends Component {
  render() {
    console.log(this.props.user.photoURL);
    return (
      <div
        className="flex direction-column align-items-center justify-center"
        style={styles.home}
      >
        <h1 className="text-align">Welcome to your very own CMS</h1>
        <div style={styles.profilePicContainer}>
          <img
            style={styles.img}
            src={this.props.user.photoURL}
            alt="profile pic"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  toggle: stateItems.toggleNewProject,
  user: stateItems.userInfo
});

export default connect(mapStateToProps)(Home);
