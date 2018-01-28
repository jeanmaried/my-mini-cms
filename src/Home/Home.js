import React, { Component } from 'react';

const styles = {
  home: {
    width: '80vw',
    minHeight: '100vh',
    paddingTop: '10vh'
  },

  profilePicContainer: {
    padding: 50,
    width: 130,
    height: 130,
    borderRadius: '50%',
    background: '#dee4e9',
    marginTop: '5vh'
  },

  img: {
    maxWidth: '100%'
  }
};

class Home extends Component {
  render() {
    return (
      <div
        className="flex direction-column align-items-center"
        style={styles.home}
      >
        <h1 className="text-align">Welcome to your very own CMS</h1>
        <div style={styles.profilePicContainer}>
          <img
            style={styles.img}
            src={require('../assets/red-rocket.png')}
            alt="hello pic"
          />
        </div>
      </div>
    );
  }
}

export default Home;
