import axios from 'axios';

export default {
  stone: {
    auth(credentials) {
      return axios.post('https://portalapi.stone.com.br/authenticate', {
        email: credentials.username,
        password: credentials.password,
      });
    },

    checkToken(token) {
      return axios.post('https://portalapi.stone.com.br/authenticate/validate', {
        token,
      });
    },

    getSales(data) {
      return axios.get('https://portalapi.stone.com.br/v1/transactions', {
        params: {
          ...data,
          format: 'json',
          includeSplits: false,
        },
        headers: {
          range: '0-10000',
          StoneCode: data.merchantIds[0],
        },
      });
    },
  },
};
