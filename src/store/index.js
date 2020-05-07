import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    removeDish(state, payload) {
      const index = state.dates[payload.dateId].dishIds.findIndex(x => x == payload.dishId);
      if (index != -1) state.dates[payload.dateId].dishIds.splice(index, 1);
    },
    addDish(state, payload) {
      if (state.dates[payload.dateId]) state.dates[payload.dateId].dishIds.push(payload.dishId);
      else Vue.set(state.dates, payload.dateId, { dishIds: [payload.dishId] });
    },
    updateDish(state, payload) {
      state.dishes[payload._id] = payload;
    }
  },
  actions: {},
  modules: {},
})