import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dates: {
      "2020-05-04": {
        dishIds: ["0"]
      },
    },
    dishes: {
      "0": {
        _id: "0",
        name: "Amerikanska pannkakor",
        image: "https://images.media-allrecipes.com/userphotos/560x315/4948036.jpg",
        link: "https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/",
        description: "Blanda mjöl, ägg och paprika i en skål."
      },

    }
  },
  mutations: {
    removeDish(state, payload) {
      const index = state.dates[payload.dateId].dishIds.findIndex(x => x == payload.dishId);
      if (index != -1) state.dates[payload.dateId].dishIds.splice(index, 1);
    }
  },
  actions: {},
  modules: {}
})