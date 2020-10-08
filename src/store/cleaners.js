const ADD_CLEANER = 'ADD_CLEANER';
const SELECT_CLEANER = 'SELECT_CLEANER';
const RESET_CLEANER = 'RESET_CLEANER'

export const addCleaner = cleaner => ({ type: ADD_CLEANER, cleaner });
export const selectCleaner = id => ({ type: SELECT_CLEANER, id });
export const resetCleaner = () => ({ type: RESET_CLEANER });

export const getCleaners = state => state.cleaners;
export const getCleaner = state => state.cleaner;

const initialState = {
  cleaners: [],
  cleaner: null,
};

const cleanersReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CLEANER:
      return {
        ...state,
        cleaners: [ ...state.cleaners, action.cleaner ],
      };
    case SELECT_CLEANER:
      return {
        ...state,
        cleaner: state.cleaners.find(c => c.id === action.id),
      };
    case RESET_CLEANER:
      return {
        ...state,
        cleaner: null,
      };
    default:
      return state;
  };
};

export default cleanersReducer;

