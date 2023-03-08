import {
  ADDPRODUCT,
  DECREASEQTY,
  INCREASEQTY,
  RESET,
  SINGLEITEMTOTAL,
  SINGLEITEMTOTALA,
  SINGLEITEMTOTALDEC,
} from "./actionTypes";

export const addNewProduct = (value) => {
  return {
    type: ADDPRODUCT,
    payload: value,
  };
};

export const decreaseQty = (id) => {
  return {
    type: DECREASEQTY,
    payload: id,
  };
};

export const increaseQty = (id) => {
  return {
    type: INCREASEQTY,
    payload: id,
  };
};

export const singleItemTotal = (value) => {
  return {
    type: SINGLEITEMTOTAL,
    payload: value,
  };
};

export const singleItemTotalDec = (value) => {
  return {
    type: SINGLEITEMTOTALDEC,
    payload: value,
  };
};

export const singleItemTotala = (value) => {
  return {
    type: SINGLEITEMTOTALA,
    payload: value,
  };
};

export const reset = (value) => {
  return {
    type: RESET,
    payload: value,
  };
};
