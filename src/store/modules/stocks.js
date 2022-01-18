import firebase from "../../API's/firebase";
import stocksData from "../../data/stocksData";
import * as types from "../types";
const state = {
  stocks: []
};
const getters = {
  [types.GET_STOCKS]: state => {
    return state.stocks;
  }
};
const mutations = {
  [types.INIT_STOCKS]: state => {
    state.stocks = stocksData;
  },
  [types.RND_STOCKS]: state => {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  },
  [types.SET_STOCKS]: (state, stocks) => {
    state.stocks = stocks;
  }
};
const actions = {
  [types.SAVE_DATA]: ({ commit, getters }) => {
    const { token, userId } = getters[types.GET_USER_DATA];
    if (!token) {
      return;
    }
    const data = {
      funds: getters[types.GET_FUNDS],
      stocks: getters[types.GET_STOCKS],
      portfolioStocks: getters[types.GET_MYSTOCKS]
    };
    try {
      firebase.patch(`/users/${userId}.json?auth=${token}`, data);
    } catch (error) {
      console.log(error.response);
    }
  },
  [types.LOAD_DATA]: async ({ commit, getters }) => {
    const { token, userId } = getters[types.GET_USER_DATA];
    if (!token) {
      return;
    }

    try {
      const { data } = await firebase.get(
        `/users/${userId}.json?auth=${token}`
      );
     
      if (data) {
        commit(types.SET_FUNDS, data.funds);
        commit(types.SET_MYSTOCKS, data.portfolioStocks);
        commit(types.SET_STOCKS, data.stocks);
      }
    } catch (error) {
      console.log(error.response);
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
