import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';


const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/user/register', userData)
    .then((res) => history.push('/'))
    .catch((err) => {
      console.log(err);
    });
};

const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/user/login', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err);
    });
};

const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/');
};

export { registerUser, loginUser, setCurrentUser, logoutUser };
