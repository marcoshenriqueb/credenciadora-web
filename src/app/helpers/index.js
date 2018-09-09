import axios from 'axios';

export default {
  storage: {
    setUserData(data) {
      localStorage.setItem('stone_user', JSON.stringify(data)); // eslint-disable-line
    },

    getUserData() {
      return JSON.parse(localStorage.getItem('stone_user')); // eslint-disable-line
    },

    setToken(token) {
      localStorage.setItem('stone_token', token); // eslint-disable-line
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },

    getToken() {
      return localStorage.getItem('stone_token'); // eslint-disable-line
    },

    unsetToken() {
      localStorage.removeItem('stone_token'); // eslint-disable-line
      localStorage.removeItem('stone_user'); // eslint-disable-line
    },
  },
};
