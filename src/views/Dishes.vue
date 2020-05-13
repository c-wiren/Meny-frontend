<template>
  <b-container class="my-4 px-4">
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
      <b-list-group-item v-for="dish in dishes" :key="dish._id" :to="$route.path + '/' + dish._id">
        <div
          class="food-image small"
          :style="{backgroundImage: (dish.image) ? ('url(' + dish.image + ')') : null}"
        >
          <b-icon icon="heart-fill" v-if="!dish.image" />
        </div>
        <div class="d-inline-block text-dark align-middle">{{dish.name}}</div>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>
<script>
export default {
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
      search: "",
      allDishes: Object.values(this.$store.state.dishes)
    };
  },
  computed: {
    dishes() {
      if (this.search)
        return this.allDishes.filter(dish =>
          dish.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(this.search.toLowerCase())
        );
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
</style>
