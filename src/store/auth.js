const ADD_USER = 'ADD_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_BALANCE = 'SET_BALANCE';
const CONFIRM_ORDER = 'CONFIRM_ORDER';
const SET_USER_FOR_RECOVER = 'SET_USER_FOR_RECOVER'
const SELECT_ORDER = 'SELECT_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const RETURN_ORDER = 'RETURN_ORDER';

export const addUser = user => ({ type: ADD_USER, user });
export const login = (username, password) => ({ 
  type: LOGIN, 
  username, 
  password,
});
export const logout = () => ({ type: LOGOUT });
export const setBalance = balance => ({ type: SET_BALANCE, balance });
export const confirmOrder = order => ({ type: CONFIRM_ORDER, order });
export const setUserForRecover = user => ({ type: SET_USER_FOR_RECOVER, user });
export const selectOrder = (id, username) => ({ type: SELECT_ORDER, id, username });
export const updateOrderStore = newOrder => ({ type: UPDATE_ORDER, newOrder });
export const returnOrder = (username, price) => ({ type: RETURN_ORDER, username, price });

export const getCurrentUser = state => state.currentUser;
export const getUsers = state => state.users;
export const getClients = state => state.users.filter(u => u.type === 'user');
export const getInfoUser = state => {
  if(state.currentUser) {
    return { 
      fullname: state.currentUser.fullname,
      username: state.currentUser.username,
    };
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
  const user = state.currentUser;
  if(user) {
    return state.orders.filter(o => o.username === user.username)
  } else {
    return null;
  }
};
export const getOrders = state => state.orders;
export const getSelectOrder = state => state.selectOrder;

const initialState = {
  users: [
    { id: 'sdfsdf', username: 'a', password: 'a', type: 'admin' },
    { id: '435345', username: 'u', password: 'u', type: 'user', 
      balance: 245, fullname: 'Zubenko Michael Petrovich' 
    },
    { id: 'dfg', username: 'andrey', password: 'a', type: 'user', 
      balance: 495, fullname: 'Petrov Andrey Stepanovich' 
    },
    { id: '34534', username: 'marina', password: 'a', type: 'user',
       balance: 320, fullname: 'Ivanova Marina' 
    },
  ],
  currentUser: null,
  recoverUser: null,
  orders: [
    {  
      date: '10/14/20',
      fullname: 'Zubenko Michael Petrovich',
      id: '2323453454334',
      price: 23,
      title: 'First service',
      username: 'u',
      status: 'ready',
    },
    {  
      date: '12/20/20',
      fullname: 'Ivanova Marina',
      id: '23464643234764',
      price: 50,
      title: 'T-shirt service',
      username: 'marina',
      status: 'new',
    }
  ],
  selectOrder: null,
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

    case SET_USER_FOR_RECOVER:
      const userRecover = state.users.find(u => {
        if(u.username === action.user.username 
          && u.fullname === action.user.fullname) {
            return u;
        }
      })
      return {
        ...state,
        currentUser: userRecover || null,
        recoverUser: null,
      }

    case SELECT_ORDER:
      const selectOrder = state.orders.find(order => {
        if(order.id === action.id && order.username === action.username) {
          return order;
        }
      })
      return {
        ...state,
        selectOrder,
      };

    case UPDATE_ORDER:
      const newOrder = { ...state.selectOrder, ...action.newOrder };
      const updateOrders = state.orders.map(order => {
        if(order.id === action.newOrder.id 
          && order.username === action.newOrder.username) {
            return newOrder;
        } else {
          return order;
        }
      })
      return {
        ...state,
        selectOrder: newOrder,
        orders: updateOrders,
      }

    case RETURN_ORDER:
      const updateUsers = state.users.map(user => {
        if(user.username === action.username) {
          return { ...user, balance: +user.balance + (+action.price) }
        } else {
          return user;
        }
      });
      return {
        ...state,
        users: updateUsers,
      }

    default:
      return state;
  }
}

export default authReducer;
