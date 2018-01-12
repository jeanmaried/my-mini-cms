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

class About extends Component {
  constructor() {
    super();
    this.state = {
      aboutTitle: '',
      aboutContent: ''
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
              aboutContent: newState.content
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
      content: this.state.aboutContent
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
