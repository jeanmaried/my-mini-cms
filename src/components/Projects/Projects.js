import React, { Component } from 'react';
import firebase, { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, getAllProjects } from '../../redux/modules/items';
import { styles } from './styles';

class Projects extends Component {
  state = {
    items: [],
    toggle: false
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) this.props.dispatch(getUser(user))
    });

    firebase.database().ref('projects').on('value', snapshot => {
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

  removeItem = (project) => {
    const { imageName, id } = project;

    firebase
      .storage()
      .ref()
      .child(imageName)
      .delete()
      .then(function () {
        console.log('File deleted successfully');
      })
      .catch(error => {
        console.log(error);
      });

    firebase
      .database()
      .ref(`/projects/${id}`)
      .remove()
      .then(() => {
        console.log('OK, gone');
      })
      .catch(error => {
        console.log('OOPS, problem: ' + error.message);
      });
  };

  addProject = () => {
    this.props.history.push('/addproject');
  };

  editItem = ({ projectInfo }) => {
    this.props.history.push(`/editproject/${projectInfo.id}`);
  };

  renderProjects = () => {
    const { listItem, img, project_header, links, siteLinks } = styles;
    return this.props.projects.reverse().map(({ projectInfo }) => {
      const { id, title, titleFr, description, descriptionFr, websiteURL, githubURL, imageURL, projectTags } = projectInfo

      return (
        <li style={listItem} className="items" key={id}>
          <div style={project_header} className="flex justify-between align-items-center">
            <h3>EN: {title}</h3>
            <button onClick={() => this.removeItem(projectInfo)}>Remove</button>
            <button onClick={() => this.editItem(projectInfo)}>Edit</button>
          </div>
          <p>Description: {description}</p>
          <div style={project_header} className="flex justify-between align-items-center">
            <h3>FR: {titleFr}</h3>
          </div>
          <p>Description: {descriptionFr}</p>
          <div className="flex justify-between">
            <img src={imageURL} style={img} alt="" />
            <div style={links}>
              <div style={project_header}>
                <h3>Links</h3>
              </div>

              <p>
                Website:<a style={siteLinks} href={websiteURL} target="_blank" >{websiteURL}</a>
              </p>
              <p>
                GitHub:<a style={siteLinks} href={githubURL} target="_blank" >{githubURL}</a>
              </p>
            </div>
          </div>
          <div>
            <div style={project_header}>
              <h3>Tags</h3>
            </div>
            <p>{projectTags}</p>
          </div>
        </li>
      );
    })
  }

  render() {
    const { user, projects } = this.props
    if (!user || !projects) return null
    const { projectContainer, button, } = styles;

    return (
      <div style={projectContainer}>
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
                  {this.renderProjects()}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  user: stateItems.userInfo,
  projects: stateItems.projects
});

export default withRouter(connect(mapStateToProps)(Projects));
