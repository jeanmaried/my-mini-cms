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

  languagesContainer: {
    width: '100%'
  },

  containerByLanguage: {
    width: '47%'
  },

  languageTitle: {
    padding: '2rem'
  }
};

class EditProject extends Component {
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

    const itemsRef = firebase
      .database()
      .ref('projects')
      .child(this.state.id);

    let projectKey = this.props.editProject;

    if (this.state.image) {
      let image = this.state.image;
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
              itemsRef.update({
                title: this.state.title,
                description: this.state.description,
                titleFr: this.state.titleFr,
                descriptionFr: this.state.descriptionFr,
                imageName: this.state.image.name,
                websiteURL: this.state.websiteURL,
                githubURL: this.state.githubURL,
                projectTags: this.state.projectTags,
                image: url
              });

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
  };

  componentWillMount() {
    this.props.editProject ? null : this.props.history.push('/projects');
  }

  componentDidMount() {
    if (this.props.editProject) {
      let projectKey = this.props.editProject;
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
    } else {
      this.props.history.push('/projects');
    }
  }

  backToProjects = () => {
    this.props.history.push('/projects');
  };

  render() {
    console.log(this.state);
    return (
      <div style={styles.projectContainer}>
        <h1 className="text-align">Edit Project</h1>
        {this.props.editProject ? (
          <div>
            <div className="container flex direction-column">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <div
                    style={styles.languagesContainer}
                    className="flex justify-between"
                  >
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
                      {this.state.loading ? 'Loading...' : 'Save Changes'}
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
  toggle: stateItems.toggleNewProject,
  editProject: stateItems.editProject
});

export default withRouter(connect(mapStateToProps)(EditProject));
