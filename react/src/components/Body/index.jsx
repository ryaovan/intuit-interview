import React, { Component } from 'react';

import axios from 'axios';

class Body extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    try {
      // const user = {
      //   username: 'testusername',
      //   name: 'testname',
      //   password: 'testpassword',
      // };
      // const res = await axios.post('/user', user);
      const res = await axios.get('/user?all=true');
      console.log(`axios get res: ${JSON.stringify(res)}`);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="body-container">
        <button onClick={this.handleClick}>test backend</button>
      </div>
    );
  }
}

export default Body;
