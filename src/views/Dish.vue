<template>
<div>
  <b-container class="my-3 px-4">
    <b-link class="float-left" @click="$router.go(-1)">
      <b-icon icon="chevron-left" scale="1.4" />Rätter</b-link>
    <b-link class="float-right">Ändra</b-link>
    <img class="image-full my-3 w-100 rounded" :src="dish.image" />
    <h1 class="text-center h4">{{dish.name}}</h1>
    <p v-html="dish.description"></p>
    <b-button variant="outline-primary" block class="card-link" :href="dish.link" target="_blank" rel="noopener noreferrer">
      Recept</b-button>
  </b-container>
</div>
</template>
<script>
export default {
  data() {
    return {
      dish: this.$store.state.dishes[this.$route.params._id]
    }
  }
}
</script>
