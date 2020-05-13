import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state,
  mutations: {
    removeDish(state, payload) {
      const index = state.dates[payload.dateId].dishIds.findIndex(x => x == payload.dishId);
      if (index != -1) state.dates[payload.dateId].dishIds.splice(index, 1);
    },
    addDish(state, payload) {
      if (state.dates[payload.dateId]) {
        if (!state.dates[payload.dateId].dishIds.includes(payload.dishId))
          state.dates[payload.dateId].dishIds.push(payload.dishId)
      }
      else Vue.set(state.dates, payload.dateId, { dishIds: [payload.dishId] });
    },
    updateDish(state, payload) {
      Vue.set(state.dishes, payload._id, payload);
    },
    newDish(state) {
      state.newDish = (new Date().getTime() / 1000 | 0).toString(16) + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
      }).toLowerCase();
    },
    createDish(state, payload) {
      if (state.newDish == payload._id) {
        Vue.set(state.dishes, payload._id, payload);
        state.newDish = null;
      }
    }
  },
  actions: {
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})