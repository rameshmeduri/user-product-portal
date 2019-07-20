import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../actions/types';

const initialState = {
  productList: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return {
        ...state,
        productList: action.payload
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        productList: [action.payload, ...state.productList]
      };

    case UPDATE_PRODUCT: {
      const newArr = state.productList.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return item;
      });

      return {
        ...state,
        productList: newArr
      };

    }

    case DELETE_PRODUCT: {      
      return {
        ...state,
        productList: state.productList.filter((o) => o._id !== action.payload)
      };
    }


    default:
      return state;
  }
}
