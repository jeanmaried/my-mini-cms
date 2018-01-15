import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { connect } from 'react-redux';
import { getUser, getToggle, getUnToggle } from '../redux/modules/items';
import { withRouter } from 'react-router-dom';

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

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectDescription: '',
      projectTitle: '',
      projectImage: ''
    };
  }

  handleChange = e => {
    if (e.target.name == 'projectImage') {
      this.setState({
        projectImage: e.target.files[0]
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    let projectImage = this.state.projectImage;

    const storageRef = firebase.storage().ref();

    const imagesRef = storageRef.child(projectImage.name);

    const itemsRef = firebase.database().ref('projects');

    imagesRef.put(projectImage).on(
      'state_changed',
      snapshot => {
        console.log(snapshot);
      },
      error => {
        console.log(error);
      },
      () => {
        imagesRef
          .getDownloadURL()
          .then(url => {
            let item = {
              title: this.state.projectTitle,
              description: this.state.projectDescription,
              image: url
            };

            itemsRef.push(item);

            this.props.history.push('/projects');
          })
          .catch(error => {});
      }
    );
  };

  backToProjects = () => {
    this.props.history.push('/projects');
  };

  render() {
    return (
      <div style={styles.projectContainer}>
        <h1 className="text-align">Add Project</h1>
        {this.props.user ? (
          <div>
            <div className="container flex direction-column">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="projectTitle"
                    placeholder="Title"
                    onChange={this.handleChange}
                    value={this.state.projectTitle}
                  />
                  <textarea
                    name="projectDescription"
                    placeholder="Description"
                    style={styles.description}
                    onChange={this.handleChange}
                    value={this.state.projectDescription}
                  />
                  <input
                    type="file"
                    name="projectImage"
                    id="Image"
                    onChange={this.handleChange}
                  />
                  <div className="flex justify-around">
                    <button style={styles.button}>Add Project</button>

                    <button style={styles.button} onClick={this.backToProjects}>
                      Cancel
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated,
  user: stateItems.userInfo,
  toggle: stateItems.toggleNewProject
});

export default withRouter(connect(mapStateToProps)(AddProject));
