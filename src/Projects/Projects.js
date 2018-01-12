import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { connect } from 'react-redux';
import { getToggle, getUnToggle } from '../redux/modules/items';
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
  },

  img: {
    height: 200
  }
};

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      toggle: false
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
            newState.push({
              id: item,
              title: items[item].title,
              description: items[item].description,
              imageURL: url,
              imageName: imageURL
            });
            this.setState({
              items: newState
            });
          })
          .catch(function(error) {});
      }
    });
  }

  removeItem = item => {
    console.log(item);

    const storageRef = firebase
      .storage()
      .ref()
      .child('project_images/' + item.imageName);
    storageRef
      .delete()
      .then(function() {
        console.log('File deleted successfully');
      })
      .catch(error => {
        console.log('Uh-oh, an error occurred!');
      });

    const itemRef = firebase.database().ref(`/projects/${item.id}`);
    itemRef.remove();
  };

  toggleNew = () => {
    this.props.dispatch(getToggle());
  };

  unToggleNew = () => {
    this.props.dispatch(getUnToggle());
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
            <div className="flex justify-center">
              {!this.props.toggle ? (
                <button style={styles.button} onClick={this.toggleNew}>
                  New Project
                </button>
              ) : (
                <button style={styles.button} onClick={this.unToggleNew}>
                  X
                </button>
              )}
            </div>
            <div className="container flex direction-column">
              {this.props.toggle ? <AddProject /> : null}
              <section className="display-item">
                <div className="wrapper">
                  <ul>
                    {this.state.items.map(item => {
                      return (
                        <li className="items" key={item.id}>
                          <h3>{item.title}</h3>
                          <p>Description: {item.description}</p>
                          <img
                            style={styles.img}
                            src={item.imageURL}
                            alt="project image"
                          />
                          <button onClick={() => this.removeItem(item)}>
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

const mapStateToProps = ({ stateItems }) => ({
  toggle: stateItems.toggleNewProject
});

export default connect(mapStateToProps)(Projects);
