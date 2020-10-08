import { createStore, combineReducers } from 'redux';
import authReducer from './auth';
import cleanerReducer from './cleaners';
import orderReducer from './order';
import * as selectorsAuth from './auth';
import * as selectorsCleaners from './cleaners';
import * as selectorsOrder from './order';



export const getUsers = state => selectorsAuth.getUsers(state.auth);
export const getCurrentUser = state => selectorsAuth.getCurrentUser(state.auth);
export const getClients = state => selectorsAuth.getClients(state.auth);
export const getUserType = state => selectorsAuth.getUserType(state.auth);
export const getBalance = state => selectorsAuth.getBalance(state.auth);
export const getUsername = state => selectorsAuth.getUsername(state.auth);
export const getOrders = state => selectorsAuth.getOrders(state.auth);
export const getUserOrders = state => selectorsAuth.getUserOrders(state.auth);
export const getCleaner = state => selectorsCleaners.getCleaner(state.cleaners);
export const getCleaners = state => selectorsCleaners.getCleaners(state.cleaners);
export const getOrder = state => selectorsOrder.getOrder(state.order);


const rootReducer = combineReducers({
  auth: authReducer,
  cleaners: cleanerReducer,
  order: orderReducer,
});

export default createStore(rootReducer);