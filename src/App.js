import React, { Component } from 'react';
import axios from 'axios';

import './App.scss';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import LoginForm from 'grommet/components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      loginErrors: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(credentials) {
    axios.post('https://portalapi.stone.com.br/authenticate', {
      email: credentials.username,
      password: credentials.password,
    })
      .then((r) => {
        this.setState({
          token: r.data.token,
        });
      }, (e) => {
        this.setState({
          loginErrors: e.response.data.messages,
        });
      });
  }

  render() {
    const { token, loginErrors } = this.state;
    return (
      <Box align="center" justify="center" full pad="medium">
        <Box align="center" size="medium">
          <Title>Bem Vindo!</Title>
          <p>{token}</p>
          <LoginForm
            onSubmit={this.onSubmit}
            errors={loginErrors}
          />
        </Box>
      </Box>
    );
  }
}

export default App;
