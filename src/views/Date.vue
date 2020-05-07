<template>
  <div class="page">
    <b-container class="my-4 px-4">
      <div class="position-relative">
        <b-link class="position-absolute" @click="$router.go(-1)">
          <b-icon icon="chevron-left" scale="1.4" />Meny
        </b-link>
        <h1 class="h6 text-center">{{dateString}}</h1>
      </div>
      <b-card
        v-for="dish in dishes"
        img-top
        :img-src="dish.image"
        :key="dish._id"
        class="my-4 border-0 shadow-lg position-relative"
      >
        <b-dropdown right no-caret variant="link" class="edit-food">
          <template v-slot:button-content>
            <b-icon icon="three-dots-vertical" scale="1.3" class="edit-food-button" />
          </template>
          <b-dropdown-item :to="$route.path + '/edit/' + dish._id">
            <b-icon icon="pencil-square" />Redigera
          </b-dropdown-item>
          <b-dropdown-item @click="removeDish(dish._id)">
            <b-icon icon="x" scale="1.2" />Ta bort
          </b-dropdown-item>
        </b-dropdown>
        <b-card-text>
          <div class="h6">{{dish.name}}</div>
          <small v-html="dish.description"></small>
        </b-card-text>
        <b-button
          variant="outline-primary"
          block
          class="card-link"
          :href="dish.link"
          target="_blank"
          rel="noopener noreferrer"
        >Recept</b-button>
      </b-card>
      <div class="my-5">
        <b-button :to="$route.path + '/add'" variant="link" class="text-secondary" block>
          <b-icon icon="plus" scale="2" />
          <small class="d-block my-1 text-decoration-none">Lägg till</small>
        </b-button>
      </div>
    </b-container>
    <div v-if="$route.name != 'Date'" class="overlay" style="z-index: 1000">
      <router-view class="bg-white rounded-top h-100 pt-2" :date="$route.params._id" />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    removeDish(id) {
      const payload = {
        dateId: this.$route.params._id,
        dishId: id
      };
      if (confirm("Är du säker?")) this.$store.commit("removeDish", payload);
    }
  },
  computed: {
    dateString() {
      const date = new Date(this.$route.params._id);
      return format(date, "eeee d MMM", {
        locale: sv
      });
    },
    date() {
      return this.$store.state.dates[this.$route.params._id];
    },
    dishes() {
      if (this.date && this.date.dishIds) {
        var dishes = [];
        for (var i in this.date.dishIds) {
          dishes.push(this.$store.state.dishes[this.date.dishIds[i]]);
        }
        return dishes;
      } else return null;
    }
  }
};
import { format } from "date-fns";
import { sv } from "date-fns/locale";
</script>
<style>
.edit-food {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  padding: 0 !important;
}

.edit-food .dropdown-toggle {
  padding: 0;
}

.edit-food-button {
  background-color: #0005;
  color: white;
  border-radius: 100px;
  padding: 0.3rem;
  width: 1.6rem;
  height: 1.6rem;
}

.dropdown-menu {
  border: 0;
  box-shadow: 0 20px 120px #000c;
  min-width: 0 !important;
  background-color: #fffe;
}
.overlay {
  background-color: #0009;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
