import axios from 'axios';

import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from './types';

const createProduct = (payload) => (dispatch) => {
  axios
    .post('/api/product', payload)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: CREATE_PRODUCT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProducts = () => (dispatch) => {
  axios
    .get('/api/product')
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProduct = (payload) => (dispatch) => {
  axios
    .put(`/api/product/${payload._id}`, payload)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: UPDATE_PRODUCT, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`/api/product/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
