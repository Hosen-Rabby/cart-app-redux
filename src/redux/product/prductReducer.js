import {
  ADDPRODUCT,
  DECREASEQTY,
  SINGLEITEMTOTAL,
  SINGLEITEMTOTALA,
  INCREASEQTY,
  SINGLEITEMTOTALDEC,
  DELETE,
  RESET,
} from "./actionTypes";

const initialState = [];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPRODUCT:
      return [...state, action.payload];

    case DECREASEQTY:
      return state.map((prod) => {
        if (prod.id !== action.payload) {
          return prod;
        }
        return {
          ...prod,
          productQty: prod.productQty - 1,
        };
      });

    case INCREASEQTY:
      return state.map((prod) => {
        if (prod.id !== action.payload) {
          return prod;
        }
        return {
          ...prod,
          productQty: prod.productQty + 1,
        };
      });

    case SINGLEITEMTOTAL:
      return state.map((prod) => {
        if (prod.id !== action.payload) {
          return prod;
        }
        return {
          ...prod,
          cartCount: prod.cartCount + 1,
        };
      });

    case SINGLEITEMTOTALDEC:
      return state.map((prod) => {
        if (prod.id !== action.payload) {
          return prod;
        }
        return {
          ...prod,
          cartCount: prod.cartCount - 1,
        };
      });

    case SINGLEITEMTOTALA:
      return state.map((prod) => {
        if (prod.id !== action.payload) {
          return {
            ...prod,
          };
        }
        return {
          ...prod,
          singleTotal: prod.cartCount * prod.productPrice,
        };
      });

    case RESET:
      return state.map((prod) => {
        if (prod.id !== action.payload) {
          return {
            ...prod,
          };
        }
        return {
          ...prod,
          cartCount: 0,
          productQty: prod.productQty + prod.cartCount,
        };
      });

    case DELETE:
      const indexOfObject = state.findIndex((object) => {
        return object.id === action.payload;
      });
      state.splice(indexOfObject, 1);
      return [...state];
    
    default:
      return state;
  }
};

export default productReducer;
