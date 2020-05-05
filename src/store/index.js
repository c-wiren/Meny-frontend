import Vue from 'vue'
import Vuex from 'vuex'
import searchPlugin from 'vuex-search';
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
      state.dates[payload.dateId].dishIds.push(payload.dishId);
    },
  },
  actions: {},
  modules: {},
  plugins: [
    searchPlugin({
      resources: {
        contacts: {
          // what fields to index
          index: ['address', 'name'],
          // access the state to be watched by Vuex Search
          getter: state => state.myResources.contacts,
          // how resource should be watched
          watch: {
            delay: 500
          },
        },
        // otherResource: { index, getter, watch, searchApi },
      },
    }),
  ],
})