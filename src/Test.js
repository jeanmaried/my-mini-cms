import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projectDescription: '',
      projectTitle: '',
      items: [],
      user: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    const itemsRef = firebase.database().ref('projects');
    itemsRef.on('value', snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          description: items[item].description
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('projects');
    const item = {
      title: this.state.projectTitle,
      description: this.state.projectDescription
    };
    itemsRef.push(item);
    this.setState({
      projectDescription: '',
      projectTitle: ''
    });
  };

  removeItem = itemId => {
    const itemRef = firebase.database().ref(`/projects/${itemId}`);
    itemRef.remove();
  };

  render() {
    return (
      <div className="app">
        {this.state.user ? (
          <div>
            {/* <div className="user-profile">
              <img src={this.state.user.photoURL} />
            </div> */}
            <div className="container">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="projectTitle"
                    placeholder="Title"
                    onChange={this.handleChange}
                    value={this.state.projectTitle}
                  />
                  <input
                    type="text"
                    name="projectDescription"
                    placeholder="Description"
                    onChange={this.handleChange}
                    value={this.state.projectDescription}
                  />
                  <button>Add Item</button>
                </form>
              </section>
              <section className="display-item">
                <div className="wrapper">
                  <ul>
                    {this.state.items.map(item => {
                      return (
                        <li className="items" key={item.id}>
                          <h3>{item.title}</h3>
                          <p>Description: {item.description}</p>
                          <button onClick={() => this.removeItem(item.id)}>
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <p>
              You must be logged in to see the potluck list and submit to it.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
