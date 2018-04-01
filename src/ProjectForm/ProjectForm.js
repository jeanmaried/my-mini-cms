import React, { Component } from 'react';
import firebase from '../firebase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { styles } from './styles';

class ProjectForm extends Component {
  state = {
    id: '',
    title: '',
    description: '',
    titleFr: '',
    descriptionFr: '',
    image: '',
    imageName: '',
    imageURL: '',
    websiteURL: '',
    githubURL: '',
    projectTags: '',
    loading: false
  };

  handleTextChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleImage = e => {
    const { files } = e.target;
    this.setState({
      image: files[0],
      imageName: files[0].name
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    const {
      title,
      description,
      titleFr,
      descriptionFr,
      imageName,
      imageURL,
      websiteURL,
      githubURL,
      projectTags,
      image,
      id
    } = this.state;

    const item = {
      title,
      description,
      titleFr,
      descriptionFr,
      imageName,
      imageURL,
      websiteURL,
      githubURL,
      projectTags
    };
    const { pathname } = this.props.location;
    const itemsRef = firebase.database().ref('projects');

    if (image) {
      this.uploadWithImage(image, item, itemsRef, id, pathname);
    } else {
      itemsRef.child(id).update(item);
      this.backToProjects();
    }
  };

  uploadWithImage = (image, item, itemsRef, id, pathname) => {
    const imagesRef = firebase
      .storage()
      .ref()
      .child(image.name);
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
            item.imageURL = url;
            if (pathname !== '/addproject') {
              itemsRef.child(id).update(item);
            } else {
              itemsRef.push(item);
            }
            this.backToProjects();
          })
          .catch(error => {});
      }
    );
  };

  componentDidMount() {
    const location = this.props.location.pathname;
    if (location !== '/addproject') {
      const id = location.slice(13);

      firebase
        .database()
        .ref('projects')
        .on('value', snapshot => {
          const projects = snapshot.val();
          const project = projects[id];

          const {
            title,
            description,
            titleFr,
            descriptionFr,
            imageName,
            imageURL,
            websiteURL,
            githubURL,
            projectTags
          } = project;

          this.setState({
            id,
            title,
            description,
            titleFr,
            descriptionFr,
            imageName,
            imageURL,
            websiteURL,
            githubURL,
            projectTags
          });
        });
    }
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref('projects')
      .off();
  }

  backToProjects = () => {
    this.props.history.push('/projects');
  };

  render() {
    const { pathname } = this.props.location;

    const {
      projectContainer,
      descriptionStyle,
      button,
      containerByLanguage,
      languageTitle
    } = styles;

    const {
      title,
      description,
      titleFr,
      descriptionFr,
      websiteURL,
      githubURL,
      projectTags,
      loading
    } = this.state;

    return (
      <div style={projectContainer}>
        <h1 className="text-align">
          {pathname === '/addproject' ? 'Add Project' : 'Edit Project'}
        </h1>
        <div>
          <div className="container flex direction-column">
            <section className="add-item">
              <form onSubmit={this.handleSubmit}>
                <div className="flex justify-between">
                  <div style={containerByLanguage}>
                    <h2 style={languageTitle} className="text-align">
                      English
                    </h2>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={this.handleTextChange}
                      value={title}
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      style={descriptionStyle}
                      onChange={this.handleTextChange}
                      value={description}
                    />
                  </div>
                  <div style={containerByLanguage}>
                    <h2 style={languageTitle} className="text-align">
                      Français
                    </h2>
                    <input
                      type="text"
                      name="titleFr"
                      placeholder="Titre"
                      onChange={this.handleTextChange}
                      value={titleFr}
                    />
                    <textarea
                      name="descriptionFr"
                      placeholder="Description"
                      style={descriptionStyle}
                      onChange={this.handleTextChange}
                      value={descriptionFr}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  name="websiteURL"
                  placeholder="Website URL"
                  onChange={this.handleTextChange}
                  value={websiteURL}
                />
                <input
                  type="text"
                  name="githubURL"
                  placeholder="GitHub URL"
                  onChange={this.handleTextChange}
                  value={githubURL}
                />
                <input
                  type="text"
                  name="projectTags"
                  placeholder="Tags"
                  onChange={this.handleTextChange}
                  value={projectTags}
                />
                <input
                  type="file"
                  name="image"
                  id="Image"
                  onChange={this.handleImage}
                />
                <div className="flex justify-around">
                  <button style={button}>
                    {loading
                      ? 'Loading...'
                      : pathname === '/addproject'
                        ? 'Add Project'
                        : 'Edit Project'}
                  </button>

                  <button style={button} onClick={this.backToProjects}>
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated
});

export default withRouter(connect(mapStateToProps)(ProjectForm));
