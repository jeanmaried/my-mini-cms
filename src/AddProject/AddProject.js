import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { connect } from 'react-redux';
import { getUser } from '../redux/modules/items';

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
      projectImage: {}
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
    const storageRef = firebase
      .storage()
      .ref('project_images/' + projectImage.name);
    storageRef.put(projectImage);
    console.log(projectImage);
    const itemsRef = firebase.database().ref('projects');
    const item = {
      title: this.state.projectTitle,
      description: this.state.projectDescription,
      image: projectImage.name
    };
    itemsRef.push(item);

    this.setState({
      projectDescription: '',
      projectTitle: '',
      projectImage: {}
    });
  };

  render() {
    return (
      <div style={styles.projectContainer}>
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
                    // value={this.state.projectImage}
                  />
                  <div className="flex justify-center">
                    <button style={styles.button}>Add Project</button>
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
  user: stateItems.userInfo
});

export default connect(mapStateToProps)(AddProject);
