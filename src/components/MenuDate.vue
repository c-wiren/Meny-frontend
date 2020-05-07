<template>
  <router-link :to="'/date/' + _id" class="text-dark">
    <div class="my-3">
      <div
        class="food-image"
        :style="{backgroundImage: (dish && dish.image) ? ('url(' + dish.image + ')') : null}"
      >
        <b-icon icon="heart-fill" v-if="!dish || !dish.image" />
      </div>
      <div class="d-inline-block border-0 align-middle">
        <span :class="{'text-primary': today}">{{title}}</span>
        <br />
        <small v-if="dish">{{dish.name}}</small>
      </div>
      <b-icon class="arrow text-secondary" scale="1.2" icon="chevron-right" />
    </div>
  </router-link>
</template>

<script>
export default {
  computed: {
    date() {
      return this.$store.state.dates[this._id];
    },
    dish() {
      if (this.date && this.date.dishIds && this.date.dishIds.length)
        return this.$store.state.dishes[this.date.dishIds[0]];
      else return null;
    }
  },
  props: ["_id", "title", "today"]
};
</script>
<style>
.food-image {
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.3rem;
  color: #fffb;
  text-align: center;
  line-height: 3.5rem;
  border-radius: 0.8rem;
  background-color: #ddd;
  display: inline-block;
  vertical-align: middle;
  margin-right: 1rem;
  background-size: cover;
  background-position: center center;
}

.arrow {
  float: right;
  height: 3.5rem;
}
.text-decoration-underline {
  text-decoration: underline;
}
</style>
