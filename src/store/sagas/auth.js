import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions'
import axios from "axios";

const apiKey = 'AIzaSyD1mY9hJ8a2NWtNeBzzliUZcR-iPZDO6as';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield put (actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authDate = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
  if (!action.isSingUp) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  }
  try {
    const response = yield axios.post(url, authDate);

    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield put(actions.authSuccess(response.data.idToken,  response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
      yield put(actions.authFail(err.response.data.error))
  }
}

export function* authCheckStateSaga (action) {
  const token = yield localStorage.getItem('token');

  if(!token) {
    yield put(actions.logout());
  } else{
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    let userId;
    try {
      const response  = yield axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, { idToken: token });
      userId = response.data.users[0].localId;
    } catch (err) {
      throw new Error('Missing user with this token');
    }
    if (expirationDate <= new Date()) {
      yield put(actions.logout())
    } else{
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}
