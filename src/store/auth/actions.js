import * as auth from '../../utils/auth';
import * as types from './types';
import * as selectors from './selectors';

export const signInWithProvider = (provider, onSuccess=null) => dispatch => {

  dispatch(setFetching(true));

  auth.loginWithProvider(provider)
  .then((payload) => {

    dispatch(signInSuccess(selectors.getUser(payload.user)))

    if(onSuccess && onSuccess instanceof Function){
      onSuccess(selectors.getUser(payload.user));
    }

  })
  .catch((error) => {
    dispatch(authError(error))
  });
};

export const signOutUser = (user) => dispatch =>  {
  auth.logoutUser(user)
  .then(() => dispatch(signOutSuccess()))
  .catch(error => dispatch(authError(error)));
};


export const signInUser = (user) => dispatch =>  {

  dispatch(setFetching(true));

  auth.loginUser(user)
  .then((result) => {
    dispatch(signInSuccess(selectors.getUser(result)))
  })
  .catch(error => dispatch(authError(error)));
}

export const signUpUser = (user) => dispatch => {

  dispatch(setFetching(true));

  auth.registerUser(user)
  .then((payload) => {
    dispatch(signInSuccess(selectors.getUser(payload)))
  })
  .catch(error => dispatch(authError(error)));
};


export const updateUser = (user) =>  dispatch => {

  dispatch(setFetching(true));

  auth.updateUserProfile(user)
  .then((payload) => {
    dispatch(signInSuccess(selectors.getUser(payload)))
  })
  .catch(error => dispatch(authError(error)));

}

export const resetPasswordEmail = (email, onSuccess) => dispatch => {
  auth.resetPasswordEmail(email)
  .then(() => {
    if(onSuccess && onSuccess instanceof Function){
      onSuccess();
    }
  })
  .catch(error => dispatch(authError(error)));
};

export const sendEmailVerification = (onSuccess) => dispatch => {
  auth.sendEmailVerification()
  .then(() => {
    if(onSuccess && onSuccess instanceof Function){
      onSuccess();
    }
  })
  .catch(error => dispatch(authError(error)));
};

export const changePassword = (newPassword, onSuccess) => dispatch => {
  auth.changePassword(newPassword)
  .then((payload) => {
    if(onSuccess && onSuccess instanceof Function){
      onSuccess(payload);
    }
  })
  .catch(error => dispatch(authError(error)));
}

export const fetchUser = () => dispatch => {

  dispatch(setFetching(true));

  auth.fetchUser()
  .then(user => dispatch(fetchSuccess(selectors.getUser(user))))
  .catch(error => dispatch(authError(error)));
}

export function setFetching(isFetching) {
  return {
    type: types.SET_FETCHING,
    isFetching
  };
}

export function signInSuccess(user) {
  return {
    type: types.SIGN_IN_SUCCESS,
    user
  };
}

export function signOutSuccess() {
  return {
    type: types.SIGN_OUT_SUCCESS
  };
}

function fetchSuccess(user) {
  return {
    type: types.FETCH_SUCCESS,
    user
  };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    error
  };
}

export function setAuthMenuOpen(open) {
  return {
    type: types.SET_AUTH_MENU_OPEN,
    open
  };
}