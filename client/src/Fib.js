import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({ seenIndexes: seenIndexes.data });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      index: this.state.index
    });

    this.setState({index: ''});
  }

  renderSeenIndexes() {
    return this.state.seenIndexes
      .map(({number}) => {number})
      .join(", ");
  }

  renderCalculatedValues() {
    return Object.keys(this.state.values)
      .map((k) => (<div key={k}>For Index {k} I calculated {this.state.values[k]}</div>));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your Index</label>
          <input 
            value={this.state.index}
            onChange={event => this.setState({index: event.target.value})}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I Have Seen</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values</h3>
        {this.renderCalculatedValues()}
      </div>
    );
  }
}

export default Fib; 
