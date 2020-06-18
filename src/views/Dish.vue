<template>
  <b-container class="mt-2 mb-4 mt-md-4 px-3" fluid="lg">
    <b-link class="float-left" @click="$router.go(-1)">
      <b-icon icon="chevron-left" scale="1.4" />Rätter
    </b-link>
    <b-link :to="$route.path + '/edit'" class="float-right">Ändra</b-link>
    <img class="image-full mt-2 mb-3 w-100 rounded" :src="dish.image" />
    <h1 class="h4">{{dish.name}}</h1>
    <p class="white-space-pre-line">{{dish.description}}</p>
    <template v-if="date">
      <b-button
        disabled
        variant="success"
        block
        v-if="$store.state.dates[date] && $store.state.dates[date].dishIds && $store.state.dates[date].dishIds.includes($route.params.dishId)"
      >Tillagd</b-button>
      <b-button
        @click="$store.dispatch('addDish', {dateId: date, dishId: $route.params.dishId}); $router.go(-2)"
        variant="success"
        block
        v-else
      >Lägg till</b-button>
    </template>
    <a
      class="d-flex px-3 py-2 justify-content-between align-items-center border rounded mt-3 mb-5"
      v-if="dish.link"
      :href="dish.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="text-nowrap overflow-hidden">
        <div class="small text-truncate">{{dish.metaSite ? dish.metaSite : "Recept"}}</div>
        <div class="small text-dark text-truncate">{{dish.metaTitle ? dish.metaTitle : dish.name}}</div>
      </div>
      <b-icon scale="1.3" icon="chevron-right" />
    </a>
  </b-container>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: this.dish ? this.dish.name : ""
    };
  },
  computed: {
    dish() {
      return this.$store.state.dishes[this.$route.params.dishId];
    }
  },
  watch: {
    dish() {
      if (this.dish.deleted) {
        this.$router.go(-1);
      }
    }
  },
  props: ["date"]
};
</script>
