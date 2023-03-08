import { DECREASECART, INCREASECART } from "./actionTypes";

const initialState = { totalCart: 0 };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASECART:
      return {
        ...state,
        totalCart: state.totalCart + 1,
      };
    case DECREASECART:
      return {
        ...state,
        totalCart: state.totalCart - action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
