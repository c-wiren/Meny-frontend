<template>
  <router-link :to="'/date/' + dateId" class="text-dark">
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
      return this.$store.state.dates[this.dateId];
    },
    dish() {
      if (this.date && this.date.dishIds && this.date.dishIds.length)
        for (var i in this.date.dishIds) {
          var dish = this.$store.state.dishes[this.date.dishIds[i]];
          if (dish && !dish.deleted) return dish;
        }
      return null;
    }
  },
  props: ["dateId", "title", "today"]
};
</script>