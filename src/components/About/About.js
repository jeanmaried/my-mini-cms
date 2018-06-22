import React, { Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { styles } from './styles';

class About extends Component {
  state = {
    title: '',
    content: '',
    titleFr: '',
    contentFr: ''
  };

  componentDidMount() {
    firebase
      .database()
      .ref('about')
      .on('value', snapshot => {
        const items = snapshot.val();
        const { title, content, titleFr, contentFr } = items;
        this.setState({
          title,
          content,
          titleFr,
          contentFr
        });
      });
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref('about')
      .off();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, content, titleFr, contentFr } = this.state;
    const item = {
      title,
      content,
      titleFr,
      contentFr
    };
    firebase
      .database()
      .ref('about')
      .update(item);
  };

  render() {
    const {
      projectContainer,
      description,
      button,
      languageContainer,
      languageTitle
    } = styles;

    const { title, content, titleFr, contentFr } = this.state;

    return (
      <div style={projectContainer}>
        <h1 className="text-align">About Page</h1>
        <div className="container flex direction-column">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <div className="flex justify-between">
                <div style={languageContainer}>
                  <h2 style={languageTitle} className="text-align">
                    English
                  </h2>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={this.handleChange}
                    value={title}
                  />
                  <textarea
                    name="content"
                    placeholder="Content"
                    style={description}
                    onChange={this.handleChange}
                    value={content}
                  />
                </div>
                <div style={languageContainer}>
                  <h2 style={languageTitle} className="text-align">
                    Français
                  </h2>
                  <input
                    type="text"
                    name="titleFr"
                    placeholder="Titre"
                    onChange={this.handleChange}
                    value={titleFr}
                  />
                  <textarea
                    name="contentFr"
                    placeholder="Contenu"
                    style={description}
                    onChange={this.handleChange}
                    value={contentFr}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button style={button}>Submit Changes</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stateItems }) => ({
  auth: stateItems.authenticated,
  user: stateItems.userInfo
});

export default connect(mapStateToProps)(About);
