const ADD_USER = 'ADD_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_BALANCE = 'SET_BALANCE';
const CONFIRM_ORDER = 'CONFIRM_ORDER'

export const addUser = user => ({ type: ADD_USER, user });
export const login = (username, password) => ({ 
  type: LOGIN, 
  username, 
  password,
});
export const logout = () => ({ type: LOGOUT });
export const setBalance = balance => ({ type: SET_BALANCE, balance });
export const confirmOrder = order => ({ type: CONFIRM_ORDER, order });

export const getCurrentUser = state => state.currentUser;
export const getUsers = state => state.users;
export const getClients = state => state.users.filter(u => u.type === 'user');
export const getUsername = state => {
  if(state.currentUser) {
    return state.currentUser.username;
  } else {
    return null;
  }
}
export const getUserType = state => {
  if(state.currentUser) {
    return state.currentUser.type;
  } else {
    return null;
  }
};
export const getBalance = state => {
  if(state.currentUser) {
    return state.currentUser.balance;
  } else {
    return null;
  }
};
export const getUserOrders = state => {
  if(state.currentUser) {
    return state.orders.filter(o => o.username === state.currentUser.username)
  } else {
    return null;
  }
};
export const getOrders = state => state.orders;

const initialState = {
  users: [
    { id: 'sdfsdf', username: 'a', password: 'a', type: 'admin' },
    { id: '435345', username: 'u', password: 'u', type: 'user', balance: 245 },
    { id: 'dfg', username: 'andrey', password: 'a', type: 'user', balance: 495 },
    { id: '34534', username: 'marina', password: 'a', type: 'user', balance: 320 },

  ],
  currentUser: null,
  orders: [],
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      
      return {
        ...state,
        users: [ ...state.users, action.user],
      };
    case LOGIN:
      const user = state.users.find(u => {
        if(u.username === action.username && u.password === action.password) {
          return u;
        }
      });
      return {
        ...state,
        currentUser: user || null,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    case SET_BALANCE:
      const copyUsers = state.users.map(u => {
        if(u.username === state.currentUser.username) {
          return { ...u, balance: action.balance };
        } else {
          return u;
        }
      })
      return {
        ...state,
        currentUser: { ...state.currentUser, balance: action.balance },
        users: copyUsers,
      };
    case CONFIRM_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    default:
      return state;
  }
}

export default authReducer;