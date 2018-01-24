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
  },

  containerByLanguage: {
    width: '35vw'
  },

  languageTitle: {
    padding: '2rem'
  }
};

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      description: '',
      titleFr: '',
      descriptionFr: '',
      image: '',
      imageName: '',
      websiteURL: '',
      githubURL: '',
      projectTags: '',
      loading: false
    };
  }

  handleChange = e => {
    if (e.target.name == 'image') {
      this.setState({
        image: e.target.files[0]
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    let projectKey = this.state.id;

    let image = this.state.image;

    if (this.props.location.pathname !== '/addproject') {
      const itemsRef = firebase
        .database()
        .ref('projects')
        .child(projectKey);

      if (image) {
        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child(image.name);
        imagesRef.put(image).on(
          'state_changed',
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            imagesRef
              .getDownloadURL()
              .then(url => {
                let item = {
                  title: this.state.title,
                  description: this.state.description,
                  titleFr: this.state.titleFr,
                  descriptionFr: this.state.descriptionFr,
                  imageName: this.state.image.name,
                  websiteURL: this.state.websiteURL,
                  githubURL: this.state.githubURL,
                  projectTags: this.state.projectTags,
                  image: url
                };

                itemsRef.update(item);

                this.props.history.push('/projects');
              })
              .catch(error => {});
          }
        );
      } else {
        itemsRef.update({
          title: this.state.title,
          description: this.state.description,
          titleFr: this.state.titleFr,
          descriptionFr: this.state.descriptionFr,
          websiteURL: this.state.websiteURL,
          githubURL: this.state.githubURL,
          projectTags: this.state.projectTags
        });
        this.props.history.push('/projects');
      }
    } else {
      const storageRef = firebase.storage().ref();

      const imagesRef = storageRef.child(image.name);

      const itemsRef = firebase.database().ref('projects');

      imagesRef.put(image).on(
        'state_changed',
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          imagesRef
            .getDownloadURL()
            .then(url => {
              let item = {
                title: this.state.title,
                description: this.state.description,
                titleFr: this.state.titleFr,
                descriptionFr: this.state.descriptionFr,
                imageName: this.state.image.name,
                websiteURL: this.state.websiteURL,
                githubURL: this.state.githubURL,
                projectTags: this.state.projectTags,
                image: url
              };

              itemsRef.push(item);

              this.props.history.push('/projects');
            })
            .catch(error => {});
        }
      );
    }
  };

  componentDidMount() {
    if (this.props.location.pathname !== '/addproject') {
      let editProject = this.props.location.pathname;

      let projectKey = editProject.slice(13);

      this.setState({
        id: projectKey
      });

      const projectsRef = firebase.database().ref('projects');

      projectsRef.on('value', snapshot => {
        let newState = [];
        let projects = snapshot.val();
        let projectData = projects[projectKey];
        this.setState({
          id: projectKey,
          title: projectData.title,
          description: projectData.description,
          titleFr: projectData.titleFr,
          descriptionFr: projectData.descriptionFr,
          imageName: projectData.imageName,
          websiteURL: projectData.websiteURL,
          githubURL: projectData.githubURL,
          projectTags: projectData.projectTags
        });
      });
    }
  }

  backToProjects = () => {
    this.props.history.push('/projects');
  };

  render() {
    return (
      <div style={styles.projectContainer}>
        <h1 className="text-align">
          {this.props.location.pathname == '/addproject'
            ? 'Add Project'
            : 'Edit Project'}
        </h1>
        {this.props.user ? (
          <div>
            <div className="container flex direction-column">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <div className="flex justify-between">
                    <div style={styles.containerByLanguage}>
                      <h2 style={styles.languageTitle} className="text-align">
                        English
                      </h2>
                      <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                        value={this.state.title}
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        style={styles.description}
                        onChange={this.handleChange}
                        value={this.state.description}
                      />
                    </div>
                    <div style={styles.containerByLanguage}>
                      <h2 style={styles.languageTitle} className="text-align">
                        Français
                      </h2>
                      <input
                        type="text"
                        name="titleFr"
                        placeholder="Titre"
                        onChange={this.handleChange}
                        value={this.state.titleFr}
                      />
                      <textarea
                        name="descriptionFr"
                        placeholder="Description"
                        style={styles.description}
                        onChange={this.handleChange}
                        value={this.state.descriptionFr}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="websiteURL"
                    placeholder="Website URL"
                    onChange={this.handleChange}
                    value={this.state.websiteURL}
                  />
                  <input
                    type="text"
                    name="githubURL"
                    placeholder="GitHub URL"
                    onChange={this.handleChange}
                    value={this.state.githubURL}
                  />
                  <input
                    type="text"
                    name="projectTags"
                    placeholder="Tags"
                    onChange={this.handleChange}
                    value={this.state.projectTags}
                  />
                  <input
                    type="file"
                    name="image"
                    id="Image"
                    onChange={this.handleChange}
                  />
                  <div className="flex justify-around">
                    <button style={styles.button}>
                      {this.state.loading
                        ? 'Loading...'
                        : this.props.location.pathname == '/addproject'
                          ? 'Add Project'
                          : 'Edit Project'}
                    </button>

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

export default withRouter(connect(mapStateToProps)(ProjectForm));
