import * as actionTypes from './actionsTypes';
import axios from 'axios';

const apiKey = 'AIzaSyD1mY9hJ8a2NWtNeBzzliUZcR-iPZDO6as';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout =(expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000 );
  };
};

export const auth = (email, password, isSingUp) => {
  return dispatch => {
    dispatch(authStart())
    const authDate = {
      email,
      password,
      returnSecureToken: true
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    if (!isSingUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }
    axios.post(url, authDate)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(response.data.idToken,  response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    } else{
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      let userId;
      axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
        idToken: token
      })
        .then(response => {
          userId = response.data.users[0].localId;
        })
        .catch(err => {
          throw new Error('Missing user with this token');
        });
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else{
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
