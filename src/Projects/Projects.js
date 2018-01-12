import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { connect } from 'react-redux';
import AddProject from '../AddProject';

const styles = {
  projectContainer: {
    width: '80vw'
  },

  description: {
    paddingBottom: 150
  },

  button: {
    width: 200
  }
};

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });

    const itemsRef = firebase.database().ref('projects');
    itemsRef.on('value', snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        let imageURL = items[item].image;
        const storageRef = firebase.storage().ref();
        storageRef
          .child('project_images/' + imageURL)
          .getDownloadURL()
          .then(url => {
            imageURL = url;
            newState.push({
              id: item,
              title: items[item].title,
              description: items[item].description,
              imageURL: imageURL
            });
            this.setState({
              items: newState
            });
          })
          .catch(function(error) {});
      }
    });
  }

  removeItem = itemId => {
    const itemRef = firebase.database().ref(`/projects/${itemId}`);
    itemRef.remove();
  };

  render() {
    return (
      <div style={styles.projectContainer}>
        {this.state.user ? (
          <div>
            <div className="user-profile">
              <img src={this.state.user.photoURL} />
            </div>
            <h1 className="text-align">Projects</h1>
            <div className="container flex direction-column">
              <AddProject />
              <section className="display-item">
                <div className="wrapper">
                  <ul>
                    {this.state.items.map(item => {
                      return (
                        <li className="items" key={item.id}>
                          <h3>{item.title}</h3>
                          <p>Description: {item.description}</p>
                          <img src={item.imageURL} alt="project image" />
                          <button onClick={() => this.removeItem(item.id)}>
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Projects;
