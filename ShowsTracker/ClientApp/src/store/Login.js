import UserService from '../services/UsersService';
import Cookies from 'universal-cookie';
import isNil from 'lodash-es/isNil';
import { actionCreators as watchlistActions } from './Watchlist';

const actions = {
  LOGIN: 'LOGIN',
  CHECK: 'CHECK',
  LOGOUT: 'LOGOUT',
  ERROR: 'ERROR'
};

const initialState = {
  isLoggedIn: false,
  error: ''
}

const userService = new UserService();
const cookies = new Cookies();
export const AuthCookieName = 'tracker_tkn';

export const actionCreators = {
  login: (emailAddress, password) => async (dispatch, getState) => {
    var authResponse = await userService.authenticate(emailAddress, password);
    if (isNil(authResponse.token)) {
      dispatch({
        type: actions.ERROR,
        error: "Cannot login."
      });
    } else {

      cookies.set(AuthCookieName, authResponse.token, {
        expires: new Date(authResponse.expires)
      });

      dispatch({
        type: actions.LOGIN,
        isLoggedIn: true
      });

      dispatch(watchlistActions.loadHistory());
    }
  },

  register: (emailAddress, password, name) => async (dispatch, getState) => {
    await userService.register(emailAddress, password, name);
  },

  check: () => async (dispatch, getState) => {
    const hasToken = cookies.get(AuthCookieName) !== undefined;

    dispatch({
      type: actions.CHECK,
      isLoggedIn: hasToken
    });
  },

  logout: () => async (dispatch, getState) => {
    cookies.remove(AuthCookieName);

    dispatch({
      type: actions.CHECK,
      isLoggedIn: false
    });
  }
};


export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        isLoggedIn: true
      };

    case actions.CHECK: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    }

    case actions.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false
      }
    }

    case actions.ERROR: {
      return {
        ...state, 
        isLoggedIn: false,
        error: action.error
      }
    }

    default:
      return state;
  }
}