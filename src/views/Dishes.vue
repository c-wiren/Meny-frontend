<template>
  <b-container class="mt-2 mb-5 mt-md-4 px-3" fluid="lg">
    <b-link v-if="date" class="float-left" @click="$router.go(-1)">Avbryt</b-link>
    <b-link v-else class="float-left" @click="$router.go(-1)">
      <b-icon icon="chevron-left" scale="1.4" />Meny
    </b-link>
    <b-link @click="newDish" class="float-right">
      <b-icon icon="pencil-square" scale="1.2" />
    </b-link>
    <h1 class="h6 text-center pb-2 m-auto w-50">Rätter</h1>
    <b-input-group class="mb-2">
      <b-form-input v-model="search" placeholder="Sök" size="sm" />
    </b-input-group>
    <b-list-group>
      <b-list-group-item
        v-for="dish in dishes"
        :key="dish.id"
        :to="$route.path + '/' + dish.id"
        class="d-flex align-items-center"
      >
        <div
          class="food-image small flex-shrink-0"
          :style="{backgroundImage: (dish.image) ? ('url(' + dish.image + ')') : null}"
        >
          <b-icon icon="heart-fill" v-if="!dish.image" />
        </div>
        <div class="text-dark food-text">{{dish.name}}</div>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>
<script>
import Fuse from "fuse.js";
export default {
  metaInfo: {
    title: "Rätter"
  },
  methods: {
    newDish() {
      this.$store.commit("newDish");
      this.$router.push(
        `${this.$route.path}/${this.$store.state.newDish}/edit`
      );
    }
  },
  props: ["date"],
  data() {
    return {
      search: ""
    };
  },
  computed: {
    allDishes() {
      return Object.values(this.$store.state.dishes)
        .filter(x => !x.deleted)
        .sort((a, b) => a.name > b.name);
    },
    fuse() {
      return new Fuse(this.allDishes, {
        keys: [
          "name",
          { name: "description", weight: 0.5 },
          "metaTitle",
          "metaSite"
        ],
        threshold: 0.3
      });
    },
    dishes() {
      if (this.search) return this.fuse.search(this.search).map(x => x.item);
      else return this.allDishes;
    }
  }
};
</script>
<style>
.food-image.small {
  width: 3.1rem;
  height: 3.1rem;
  line-height: 3.1rem;
  border-radius: 0.7rem;
  margin-right: 0.8rem;
}
.food-text {
  max-height: 3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
