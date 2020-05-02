<template>
<div>
  <b-container class="px-4">
    <h1 class="my-3">Meny</h1>
    <router-link :to="'/date/' + date._id" class="text-dark" v-for="date in display" :key="date._id">
      <div class="my-3">
        <div class="food-image">
          <b-icon icon="heart-fill" />
        </div>
        <div class="d-inline-block border-0 align-middle">{{date.title}}<br><small>{{food[date._id]}}</small></div>
        <b-icon class="arrow" icon="chevron-right" />
      </div>
    </router-link>
  </b-container>
  <router-view />
</div>
</template>

<script>
import {
  format,
  addDays
} from 'date-fns'
import {
  sv
} from 'date-fns/locale'
export default {
  data: function() {
    return {
      today: format(new Date(), "yyyy-MM-dd"),
      display: [],
      food: {
        "2020-05-01": "Spaghetti med köttfärssås",
        "2020-05-02": "Falukorv i ugn",
      }
    }
  },
  created: function() {
    var current = new Date();
    for (var i = 0; i < 10; i++) {
      this.display.push({
        title: format(addDays(current, i), "eeee d MMM", {
          locale: sv
        }),
        _id: format(addDays(current, i), "yyyy-MM-dd")
      });
    }
  },
}
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
}

.arrow {
  float: right;
  height: 3.5rem;
}
</style>
