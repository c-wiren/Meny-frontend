import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

var c;
var api = process.env.NODE_ENV == "development" ? "http://localhost:5000" : "https://apimeny.wiren.cc";
var ws = process.env.NODE_ENV == "development" ? "ws://localhost:5000/ws" : "wss://apimeny.wiren.cc/ws";
var connectCount = 0;
var active = false;
var initialSet = "";
var requests = {};

const ObjectId = () => (new Date().getTime() / 1000 | 0).toString(16) + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
  return (Math.random() * 16 | 0).toString(16);
}).toLowerCase();
export default new Vuex.Store({
  state,
  mutations: {
    removeDish(state, payload) {
      const index = state.dates[payload.dateId].dishIds.findIndex(x => x == payload.dishId);
      if (index != -1) {
        state.dates[payload.dateId].dishIds.splice(index, 1);
        if (state.changedDates[payload.dateId])
          state.changedDates[payload.dateId][payload.dishId] = false
      }
    },
    addDish(state, payload) {
      if (state.dates[payload.dateId]) {
        if (!state.dates[payload.dateId].dishIds)
          Vue.set(state.dates[payload.dateId], "dishIds", []);
        if (!state.dates[payload.dateId].dishIds.includes(payload.dishId))
          state.dates[payload.dateId].dishIds.push(payload.dishId)
      }
      else Vue.set(state.dates, payload.dateId, { dishIds: [payload.dishId], date: payload.dateId });
      if (!state.changedDates[payload.dateId])
        state.changedDates[payload.dateId] = {};
      state.changedDates[payload.dateId][payload.dishId] = true;
    },
    updateDish(state, payload) {
      var dish = payload.data;
      var changeId = payload.id;
      Vue.set(state.dishes, dish.id, { ...state.dishes[dish.id], ...dish });
      var changed = {};
      for (var i in dish) {
        if (i != "id")
          changed[i] = true
      }
      state.changedDishes[dish.id] = { ...state.changedDishes[dish.id], ...changed };
      if (changeId) {
        var requestDishes = {};
        requestDishes[dish.id] = changed;
        requests[changeId] = { dishes: requestDishes };
      }
    },
    newDish(state) {
      state.newDish = ObjectId();
    },
    createDish(state, payload) {
      var dish = payload.data;
      var changeId = payload.id;
      Vue.set(state.dishes, dish.id, dish);
      state.newDish = null;
      var changed = {};
      for (var i in dish) {
        if (i != "id")
          changed[i] = true
      }
      state.changedDishes[dish.id] = changed;
      if (changeId) {
        var requestDishes = {};
        requestDishes[dish.id] = changed;
        requests[changeId] = { dishes: requestDishes };
      }
    },
    status(state, payload) {
      state.status = payload;
    },
    login(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = null;
      state.dates = {};
      state.dishes = {};
      state.newDish = null;
      state.changed = null;
      state.changedDates = {};
      state.changedDishes = {};
      state.status = 0;
      connectCount = 0;
      active = false;
      initialSet = "";
      requests = {};
    },
    serverSet(state, payload) {
      // Add dishes
      for (var i in payload.data.dishes) {
        var id = payload.data.dishes[i].id;
        // Merge with old dish
        Vue.set(state.dishes, id, { ...state.dishes[id], ...payload.data.dishes[i] });
        // If this devices changed the dish
        if (state.changedDishes[id]) {
          // Delete the changelog if match
          for (var j in payload.data.dishes[i]) {
            delete state.changedDishes[id][j]
          }
          // If no more changes, delete change object
          if (Object.keys(state.changedDishes[id]).length == 0) {
            delete state.changedDishes[id];
          }
        }
      }
      // Add dates
      for (i in payload.data.dates) {
        var date = payload.data.dates[i].date;
        // Add dishIds array if not existing (avoiding bugs below)
        Vue.set(state.dates, date, { ...{ dishIds: [] }, ...payload.data.dates[i] });
        // If this device changed the date
        if (state.changedDates[date]) {
          // Check against changed records
          for (j in state.changedDates[date]) {
            if (state.dates[date].dishIds)
              var index = state.dates[date].dishIds.findIndex(x => x == j)
            // If it should be in the list
            if (state.changedDates[date][j] == true) {
              // And it is
              if (index != -1)
                // Delete change record
                delete state.changedDates[date][j]
              // Else add element
              else state.dates[date].dishIds.push(j)
            }
            // If it should not be in the list
            else if (state.changedDates[date][j] == false) {
              // And it is not
              if (index == -1)
                // Delete change record
                delete state.changedDates[date][j]
              // Else remove element
              else state.dates[date].dishIds.splice(index, 1);
            }
          }
          if (Object.keys(state.changedDates[date]).length == 0) {
            delete state.changedDates[date];
          }
        }
      }
      state.changed = payload.params.changed;
    },
    serverConfirm(state, payload) {
      var changeId = payload.params.id;
      var request = requests[changeId];
      // If the request was from this device
      if (request) {
        // For each dish in the request
        for (var id in request.dishes) {
          var dish = request.dishes[id];
          // If the changelog contains the dish
          if (state.changedDishes[id]) {
            // Delete the changelog if match
            for (var j in dish) {
              delete state.changedDishes[id][j]
            }
            // If empty changelog, delete it
            if (Object.keys(state.changedDishes[id]).length == 0) {
              delete state.changedDishes[id];
            }
          }
        }
        delete requests[changeId];
      }
    }
  },
  actions: {
    async updateUser(_, payload) {
      var response = await fetch(api + "/users", {
        credentials: "include",
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        // var data = await response.json();
        return
      }
      else {
        throw response.status
      }
    },
    async validate(_, payload) {
      var response = await fetch(api + "/validate", {
        method: 'POST',
        body: payload
      });
      if (response.ok) return response.text();
      else throw response.status;
    },
    async signup({ commit, dispatch }, payload) {
      var response = await fetch(api + "/users", {
        credentials: "include",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        var data = await response.json();
        commit('login', data);
        dispatch("connect");
        return
      }
      else {
        throw response.status
      }
    },
    async logout({ commit }) {
      c.close();
      commit("logout");
      await fetch(api + "/logout", {
        credentials: 'include'
      });
    },
    serverSet({ dispatch, commit }, payload) {
      if (payload.data.dishes || payload.data.dates)
        commit("serverSet", payload);
      if (!active && payload.params.id == initialSet) {
        initialSet = "";
        active = true;
        commit("status", 2);
        dispatch("sync");
      }
    },
    async login({ commit, dispatch }, payload) {
      const response = await fetch(api + "/login", {
        method: "POST", credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        var data = await response.json();
        commit('login', data);
        dispatch("connect");
        return
      }
      else {
        throw response.status
      }
    },
    async connect({ commit, state, dispatch }) {
      if (!state.user) return;
      connectCount++;
      c = new WebSocket(ws);
      c.onmessage = (event) => {
        var data = JSON.parse(event.data);
        if (process.env.NODE_ENV == 'development') console.log("onmessage: " + data);
        switch (data.method) {
          case "set":
            dispatch("serverSet", data)
            break;
          case "confirm":
            commit("serverConfirm", data);
            break
        }
      };
      c.onopen = () => {
        initialSet = ObjectId();
        c.send(JSON.stringify({ method: "get", params: { changed: state.changed, id: initialSet } }));
        connectCount = 1;
        setTimeout(() => { if (connectCount == 1) connectCount = 0 }, 3000);
        commit("status", 1);
        if (process.env.NODE_ENV == 'development') console.log("connected");
      };
      c.onclose = () => {
        active = false;
        commit("status", 0);
        if (navigator.onLine) {
          if (connectCount == 0) {
            dispatch("connect");
          } else setTimeout(() => dispatch("connect"), connectCount > 3 ? 30000 : 3000);
        }
        if (process.env.NODE_ENV == 'development') console.log("disconnected");
      };
    },
    init({ state, dispatch }) {
      window.addEventListener('online', () => dispatch("connect"));
      if (state.user) dispatch("connect");
    },
    createDish({ state, commit }, payload) {
      if (state.newDish == payload.id) {
        if (active) var changeId = ObjectId();
        commit("createDish", { data: payload, id: changeId });
        if (changeId)
          c.send(JSON.stringify({ method: "set", data: { dishes: [payload] }, params: { id: changeId } }))
      }
    },
    updateDish({ commit }, payload) {
      if (active) var changeId = ObjectId();
      commit("updateDish", { data: payload, id: changeId });
      if (ObjectId)
        c.send(JSON.stringify({ method: "set", data: { dishes: [payload] }, params: { id: changeId } }))
    },
    addDish({ state, commit }, payload) {
      commit("addDish", payload);
      if (active)
        c.send(JSON.stringify({ method: "set", data: { dates: [state.dates[payload.dateId]] } }))
    },
    removeDish({ state, commit }, payload) {
      commit("removeDish", payload);
      if (active)
        c.send(JSON.stringify({ method: "set", data: { dates: [state.dates[payload.dateId]] } }))
    },
    sync({ state }) {
      if (Object.keys(state.changedDishes).length == 0 && Object.keys(state.changedDates).length == 0) return;
      var changeId = ObjectId();
      var request = { method: "set", params: { id: changeId }, data: { dishes: [], dates: [] } };
      for (var id in state.changedDishes) {
        var dish = { id: id };
        for (var key in state.changedDishes[id]) {
          dish[key] = state.dishes[id][key];
        }
        request.data.dishes.push(dish);
      }
      for (var date in state.changedDates) {
        request.data.dates.push(state.dates[date]);
      }
      c.send(JSON.stringify(request))
      requests[changeId] = { dishes: JSON.parse(JSON.stringify(state.changedDishes)) };
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
})
