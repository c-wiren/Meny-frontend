<template>
<b-container class="my-3">
  <div class="text-center mb-2">
    <b-form-input placeholder="Sök" />
  </div>
  <div class="border rounded px-2">
    <router-link v-for="dish in Object.values($store.state.dishes)" :key="dish._id" :to="$route.path + '/' + dish._id">
      <div class="my-2">
        <div class="food-image small" :style="{backgroundImage: (dish.image) ? ('url(' + dish.image + ')') : null}">
          <b-icon icon="heart-fill" v-if="!dish.image" />
        </div>
        <div class="d-inline-block text-dark align-middle">
          {{dish.name}}
        </div>
      </div>
    </router-link>
  </div>
</b-container>
</template>
<style>
.food-image.small {
  width: 3.1rem;
  height: 3.1rem;
  line-height: 3.1rem;
  border-radius: 0.7rem;
  margin-right: 0.8rem;
}
</style>
