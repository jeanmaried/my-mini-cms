import React, { Component } from 'react';
import firebase, { auth } from '../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, getAllProjects } from '../redux/modules/items';
import ProjectForm from '../ProjectForm';

const styles = {
  projectContainer: {
    width: '80vw',
    minHeight: '100vh'
  },

  listItem: {
    width: '80vw',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.50)',
    padding: 10,
    borderRadius: 5,
    marginBottom: '2rem',
    marginTop: '2rem'
  },

  description: {
    paddingBottom: 150
  },

  button: {
    width: 200
  },

  img: {
    height: 200,
    maxWidth: '40vw'
  },

  project_header: {
    backgroundColor: '#292f33',
    margin: 0,
    color: '#fff',
    fontWeight: '300',
    padding: 15
  },

  links: {
    width: '40vw'
  },

  siteLinks: {
    textDecoration: 'underline'
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
        let projectInfo = projects[project];
        projectInfo.id = project;
        newState.push({
          projectInfo
        });
      }
      this.props.dispatch(getAllProjects(newState));
    });
  }

  removeItem = project => {
    console.log('remove');
    let projectInfo = project.projectInfo;
    const storageRef = firebase
      .storage()
      .ref()
      .child(projectInfo.imageName);

    storageRef
      .delete()
      .then(function() {
        console.log('File deleted successfully');
      })
      .catch(error => {
        console.log('Uh-oh, an error occurred!');
      });

    const itemRef = firebase.database().ref(`/projects/${projectInfo.id}`);

    itemRef
      .remove()
      .then(() => {
        console.log('OK, gone');
      })
      .catch(e => {
        console.log('OOPS, problem: ' + e.message);
      });
  };

  addProject = () => {
    this.props.history.push('/addproject');
  };

  editItem = project => {
    let projectId = project.projectInfo.id;
    this.props.history.push(`/editproject/${projectId}`);
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
              {this.props.toggle ? <ProjectForm /> : null}
              <section className="display-project">
                <div className="wrapper">
                  <ul>
                    {this.props.projects
                      ? this.props.projects.reverse().map(project => {
                          let projectInfo = project.projectInfo;

                          return (
                            <li
                              style={styles.listItem}
                              className="items"
                              key={projectInfo.id}
                            >
                              <div
                                style={styles.project_header}
                                className="flex justify-between align-items-center"
                              >
                                <h3>EN: {projectInfo.title}</h3>
                                <button
                                  onClick={() => this.removeItem(project)}
                                >
                                  Remove
                                </button>
                                <button onClick={() => this.editItem(project)}>
                                  Edit
                                </button>
                              </div>
                              <p>Description: {projectInfo.description}</p>
                              <div
                                style={styles.project_header}
                                className="flex justify-between align-items-center"
                              >
                                <h3>FR: {projectInfo.titleFr}</h3>
                              </div>
                              <p>Description: {projectInfo.descriptionFr}</p>
                              <div className="flex justify-between">
                                <img
                                  src={projectInfo.imageURL}
                                  style={styles.img}
                                  alt=""
                                />
                                <div style={styles.links}>
                                  <div style={styles.project_header}>
                                    <h3>Links</h3>
                                  </div>

                                  <p>
                                    Website:{' '}
                                    <a
                                      style={styles.siteLinks}
                                      href={projectInfo.websiteURL}
                                      target="_blank"
                                    >
                                      {projectInfo.websiteURL}
                                    </a>
                                  </p>

                                  <p>
                                    GitHub:{' '}
                                    <a
                                      style={styles.siteLinks}
                                      href={projectInfo.githubURL}
                                      target="_blank"
                                    >
                                      {projectInfo.githubURL}
                                    </a>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div style={styles.project_header}>
                                  <h3>Tags</h3>
                                </div>
                                <p>{projectInfo.projectTags}</p>
                              </div>
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
