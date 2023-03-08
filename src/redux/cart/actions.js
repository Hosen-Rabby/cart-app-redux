import { DECREASECART, INCREASECART } from "./actionTypes";

export const increaseCart = () => {
  return {
    type: INCREASECART,
  };
};

export const decreaseCart = (value) => {
  return {
    type: DECREASECART,
    payload: value,
  };
};
