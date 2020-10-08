const ADD_ORDER = 'ADD_ORDER';

export const addOrder = order => ({ type: ADD_ORDER, order });

export const getOrder = state => state.order;

const initialState = {
  order: null,
};

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ORDER:
      return {
        ...state,
        order: action.order,
      };

    default: 
      return state;
  }
}

export default orderReducer;