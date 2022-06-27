import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Dispatch} from '@reduxjs/toolkit';
import {RootState} from '..';
import * as U from '../../utils';

interface User {
  email: string;
  name: string;
  password: string;
}

interface LoginState {
  loggedIn: boolean;
  loggedUser: User;
}

const initialState: LoginState = {
  loggedIn: false,
  loggedUser: {
    email: '',
    name: '',
    password: '',
  },
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
      state.loggedIn = true;
    },
    logout: () => initialState,
  },
});

export const {login, logout} = loginSlice.actions;

export const selectLoggedIn = (state: RootState) => state.login.loggedIn;
export const selectLoggedUser = (state: RootState) => state.login.loggedUser;

export const loggedUserKey = 'loggedUser';
export const signUp = (newUser: User) => (dispatch: Dispatch) => {
  U.writeToStorage(loggedUserKey, JSON.stringify(newUser))
    .then(() => dispatch(login(newUser)))
    .catch(e => dispatch(login(newUser)));
};
