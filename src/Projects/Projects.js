import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getToggle,
  getUnToggle,
  getUser,
  getAllProjects
} from '../redux/modules/items';
import AddProject from '../AddProject';

const styles = {
  projectContainer: {
    width: '80vw',
    minHeight: '100vh',
    borderBottom: '3px solid #103d5d'
  },

  description: {
    paddingBottom: 150
  },

  button: {
    width: 200
  },

  img: {
    height: 200
  },

  project_header: {
    backgroundColor: '#103d5d',
    margin: 0,
    color: '#fff',
    fontWeight: '300',
    padding: 15
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
        this.props.dispatch(getUser(user));
      }
    });

    const projectsRef = firebase.database().ref('projects');

    projectsRef.on('value', snapshot => {
      let newState = [];
      let projects = snapshot.val();

      for (let project in projects) {
        // let imageName = projects[project].image;
        newState.push({
          id: project,
          title: projects[project].title,
          description: projects[project].description,
          image: projects[project].image
        });
      }
      this.props.dispatch(getAllProjects(newState));
    });
  }

  removeItem = item => {
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

  addProject = () => {
    this.props.history.push('/addproject');
  };

  render() {
    return (
      <div style={styles.projectContainer}>
        {this.props.user ? (
          <div>
            <h1 className="text-align">Projects</h1>
            <div className="flex justify-center">
              <button style={styles.button} onClick={this.addProject}>
                New Project
              </button>
            </div>
            <div className="container flex direction-column">
              {this.props.toggle ? <AddProject /> : null}
              <section className="display-project">
                <div className="wrapper">
                  <ul>
                    {this.props.projects
                      ? this.props.projects.map(project => {
                          return (
                            <li
                              style={styles.projectContainer}
                              className="items"
                              key={project.id}
                            >
                              <div
                                style={styles.project_header}
                                className="flex justify-between"
                              >
                                <h3>{project.title}</h3>
                                <button
                                  onClick={() => this.removeItem(project)}
                                >
                                  Remove
                                </button>
                              </div>
                              <p>Description: {project.description}</p>
                              <img
                                src={project.image}
                                style={styles.img}
                                alt="project image"
                              />
                            </li>
                          );
                        })
                      : null}
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
  toggle: stateItems.toggleNewProject,
  user: stateItems.userInfo,
  projects: stateItems.projects
});

export default withRouter(connect(mapStateToProps)(Projects));
