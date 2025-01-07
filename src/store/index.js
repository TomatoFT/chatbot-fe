import { createStore } from 'redux';

const initialState = {
  token: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'CLEAR_TOKEN':
      return { ...state, token: null };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
