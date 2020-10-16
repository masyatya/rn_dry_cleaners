const ADD_CLEANER = 'ADD_CLEANER';
const SELECT_CLEANER = 'SELECT_CLEANER';
const RESET_CLEANER = 'RESET_CLEANER';
const EDIT_SERVICE = 'EDIT_SERVICE';
const DELETE_SERVICE = 'DELETE_SERVICE';
const ADD_SERVICE = 'ADD_SERVICE';
const DELETE_CLEANER = 'DELETE_CLEANER';

export const addCleaner = cleaner => ({ type: ADD_CLEANER, cleaner });
export const selectCleaner = id => ({ type: SELECT_CLEANER, id });
export const resetCleaner = () => ({ type: RESET_CLEANER });
export const editServiceStore = newService => ({ type: EDIT_SERVICE, newService });
export const deleteServiceStore = serviceId => ({ type: DELETE_SERVICE, serviceId });
export const addServiceStore = service => ({ type: ADD_SERVICE, service });
export const deleteCleanerStore = () => ({ type: DELETE_CLEANER });

export const getCleaners = state => state.cleaners;
export const getCleaner = state => state.cleaner;

const initialState = {
  cleaners: [
    { id: '345255747', 
      title: 'First title cleaner', 
      description: 'Lorem Ipsum is simply dummy text of.',
      services: [ { title: 'T-shirt service', price: 50, id: '23234534'} ],
    },
    { id: '6236237457', 
      title: 'Second title cleaner', 
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      services: [ 
        { title: 'Pants service', price: 20, id: '78646134687'},
        { title: 'Shirt service', price: 80, id: '252342634656'},
        { title: 'Coat service', price: 120, id: '2345234623767'},
     ],
    }
  ],
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

    case EDIT_SERVICE:
      const services = state.cleaner.services.map(serv => {
        if(serv.id === action.newService.id) {
          return { ...serv, ...action.newService }
        } else {
          return serv;
        }
      });
      const newCleaner = { ...state.cleaner, services };
      const newCleaners = state.cleaners.map(cl => {
        if(cl.id === state.cleaner.id) {
          return newCleaner;
        } else {
          return cl;
        }
      })
      return {
        ...state,
        cleaner: newCleaner,
        cleaners: newCleaners,
      };

    case DELETE_SERVICE:
      const filteredServices = state.cleaner.services
        .filter(serv => serv.id !== action.serviceId);
      const filteredCleaner = { ...state.cleaner, services: filteredServices };
      const filteredCleaners = state.cleaners.map(cl => {
        if(cl.id === state.cleaner.id) {
          return filteredCleaner;
        } else {
          return cl;
        }
      });
      return {
        ...state,
        cleaner: filteredCleaner,
        cleaners: filteredCleaners,
      };

    case ADD_SERVICE:
      const copyServices = [...state.cleaner.services];
      copyServices.push(action.service);
      const copyCleaner = { ...state.cleaner, services: copyServices };

      return {
        ...state,
        cleaner: copyCleaner,
        cleaners: state.cleaners.map(cl => {
          if(cl.id === state.cleaner.id) {
            return copyCleaner;
          } else {
            return cl;
          }
        }),
      };

    case DELETE_CLEANER:
      return {
        ...state,
        cleaners: state.cleaners.filter(cl => cl.id !== state.cleaner.id),
        cleaner: null,
      }

    default:
      return state;
  };
};

export default cleanersReducer;
