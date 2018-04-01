import React, { Component } from 'react';
import firebase, { auth } from '../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, getAllProjects } from '../redux/modules/items';
import { styles } from './styles';

class Projects extends Component {
  state = {
    items: [],
    toggle: false
  };

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
    const { imageName, id } = project.projectInfo;
    firebase
      .storage()
      .ref()
      .child(imageName)
      .delete()
      .then(function() {
        console.log('File deleted successfully');
      })
      .catch(error => {
        console.log('Uh-oh, an error occurred!');
      });

    firebase
      .database()
      .ref(`/projects/${id}`)
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
    this.props.history.push(`/editproject/${project.projectInfo.id}`);
  };

  render() {
    const {
      projectContainer,
      listItem,
      button,
      img,
      project_header,
      links,
      siteLinks
    } = styles;

    return (
      <div style={projectContainer}>
        {this.props.user ? (
          <div>
            <h1 className="text-align">Projects</h1>
            <div className="flex justify-center">
              <button style={button} onClick={this.addProject}>
                New Project
              </button>
            </div>
            <div className="container flex direction-column">
              <section className="display-project">
                <div className="wrapper">
                  <ul>
                    {this.props.projects
                      ? this.props.projects.reverse().map(project => {
                          const projectInfo = project.projectInfo;

                          return (
                            <li
                              style={listItem}
                              className="items"
                              key={projectInfo.id}
                            >
                              <div
                                style={project_header}
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
                                style={project_header}
                                className="flex justify-between align-items-center"
                              >
                                <h3>FR: {projectInfo.titleFr}</h3>
                              </div>
                              <p>Description: {projectInfo.descriptionFr}</p>
                              <div className="flex justify-between">
                                <img
                                  src={projectInfo.imageURL}
                                  style={img}
                                  alt=""
                                />
                                <div style={links}>
                                  <div style={project_header}>
                                    <h3>Links</h3>
                                  </div>

                                  <p>
                                    Website:
                                    <a
                                      style={siteLinks}
                                      href={projectInfo.websiteURL}
                                      target="_blank"
                                    >
                                      {projectInfo.websiteURL}
                                    </a>
                                  </p>

                                  <p>
                                    GitHub:
                                    <a
                                      style={siteLinks}
                                      href={projectInfo.githubURL}
                                      target="_blank"
                                    >
                                      {projectInfo.githubURL}
                                    </a>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div style={project_header}>
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
  user: stateItems.userInfo,
  projects: stateItems.projects
});

export default withRouter(connect(mapStateToProps)(Projects));
