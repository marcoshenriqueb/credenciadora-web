import React, { Component } from 'react';

import '../App.scss';

import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import LoginForm from 'grommet/components/LoginForm';
import RevCheck from './pages/RevCheck';

import Api from './api';
import Helpers from './helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isTokenValid: false,
      loginErrors: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const token = Helpers.storage.getToken();
    if (!token) {
      this.setState({
        loading: false,
        isTokenValid: false,
      });
      return;
    }

    Api.stone.checkToken(token)
      .then((r) => {
        Helpers.storage.setToken(r.data.token);
        this.setState({
          loading: false,
          isTokenValid: true,
        });
      }, () => {
        Helpers.storage.unsetToken();
        this.setState({
          loading: false,
          isTokenValid: false,
        });
      });
  }

  onSubmit(credentials) {
    Api.stone.auth(credentials)
      .then((r) => {
        Helpers.storage.setToken(r.data.token);
        Helpers.storage.setUserData(r.data);
        this.setState({
          isTokenValid: true,
        });
      }, (e) => {
        this.setState({
          loginErrors: e.response.data.messages,
        });
      });
  }

  render() {
    const {
      token,
      loginErrors,
      loading,
      isTokenValid,
    } = this.state;

    if (loading) return <Box align="center" justify="center" full>Loading</Box>;

    if (!isTokenValid) {
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

    return <RevCheck />;
  }
}

export default App;
