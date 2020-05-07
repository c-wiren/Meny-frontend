<template>
  <b-container class="my-4 px-4">
    <b-link class="float-left" @click="$router.go(-1)">
      <b-icon icon="chevron-left" scale="1.4" />Rätter
    </b-link>
    <b-link :to="$route.path + '/edit'" class="float-right">Ändra</b-link>
    <img class="image-full mt-2 mb-3 w-100 rounded" :src="dish.image" />
    <h1 class="h4">{{dish.name}}</h1>
    <p v-html="dish.description"></p>
    <b-button
      @click="$store.commit('addDish', {dateId: date, dishId: $route.params.dishId}); $router.go(-2)"
      variant="success"
      block
      v-if="date"
    >Lägg till</b-button>
    <b-button
      variant="outline-primary"
      block
      class="card-link"
      :href="dish.link"
      target="_blank"
      rel="noopener noreferrer"
    >Recept</b-button>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      dish: this.$store.state.dishes[this.$route.params.dishId]
    };
  },
  props: ["date"]
};
</script>
