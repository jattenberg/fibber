import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    axios.get('/api/values/current').then(values => {
        this.setState({ values: values.data });
      }).catch(error => {
        console.log(error);
      });    
  }

  async fetchIndexes() {
    axios.get('/api/values/all').then(seenIndexes => {
      this.setState({
        seenIndexes: seenIndexes.data
      });
    }).catch(error => {
      console.log(error);
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    axios.post('/api/values', {
      index: this.state.index
    }).then(response => {
      this.setState({ index: '' });
    }).catch(error => {
      console.log(error);
    });
  };

  renderSeenIndexes() {
    const arr = this.state.seenIndexes;
    return (arr && arr.length) ? arr.map(({ number }) => number).join(', ') : "";
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
