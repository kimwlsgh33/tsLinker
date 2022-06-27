import {createStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';

export const makeStore = () => {
  const store = createStore(rootReducer);
  return store;
};
