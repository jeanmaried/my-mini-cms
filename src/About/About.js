import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import { connect } from 'react-redux';
import { getUser } from '../redux/modules/items';

const styles = {
  projectContainer: {
    width: '80vw',
    minHeight: '100vh'
  },

  description: {
    paddingBottom: 150
  },

  button: {
    width: 200
  },

  languageContainer: {
    width: '35vw'
  },

  languageTitle: {
    padding: '2rem'
  }
};

class About extends Component {
  constructor() {
    super();
    this.state = {
      aboutTitle: '',
      aboutContent: '',
      aboutTitleFr: '',
      aboutContentFr: ''
    };
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('about');
    itemsRef.on('value', snapshot => {
      let items = snapshot.val();
      let newState = items;
      {
        newState
          ? this.setState({
              aboutTitle: newState.title,
              aboutContent: newState.content,
              aboutTitleFr: newState.titleFr,
              aboutContentFr: newState.contentFr
            })
          : null;
      }
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('about');
    const item = {
      title: this.state.aboutTitle,
      content: this.state.aboutContent,
      titleFr: this.state.aboutTitleFr,
      contentFr: this.state.aboutContentFr
    };
    itemsRef.update(item);
  };

  render() {
    return (
      <div style={styles.projectContainer}>
        <h1 className="text-align">About Page</h1>
        <div className="container flex direction-column">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <div className="flex justify-between">
                <div style={styles.languageContainer}>
                  <h2 style={styles.languageTitle} className="text-align">
                    English
                  </h2>
                  <input
                    type="text"
                    name="aboutTitle"
                    placeholder="Title"
                    onChange={this.handleChange}
                    value={this.state.aboutTitle}
                  />
                  <textarea
                    name="aboutContent"
                    placeholder="Content"
                    style={styles.description}
                    onChange={this.handleChange}
                    value={this.state.aboutContent}
                  />
                </div>
                <div style={styles.languageContainer}>
                  <h2 style={styles.languageTitle} className="text-align">
                    Français
                  </h2>{' '}
                  <input
                    type="text"
                    name="aboutTitleFr"
                    placeholder="Titre"
                    onChange={this.handleChange}
                    value={this.state.aboutTitleFr}
                  />
                  <textarea
                    name="aboutContentFr"
                    placeholder="Contenu"
                    style={styles.description}
                    onChange={this.handleChange}
                    value={this.state.aboutContentFr}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button style={styles.button}>Submit Changes</button>
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
