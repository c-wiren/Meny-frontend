<template>
<div class="page">
  <b-container class="px-4 my-3 mb-4">
    <div class="text-center py-1"><img width="90" src="/logo.png" /></div>
    <b-link class="text-center d-block" @click="load(-1)">Ladda tidigare</b-link>
    <MenuDate :_id="date._id" :title="date.title" v-for="date in display" :key="date._id" />
    <b-link class="text-center d-block" @click="load">Ladda senare</b-link>
  </b-container>
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
import MenuDate from "@/components/MenuDate"
export default {
  name: "Menu",
  data: function() {
    return {
      today: format(new Date(), "yyyy-MM-dd"),
      display: [],
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load(direction) {
      var date, i;
      var newElements = [];

      if (direction != 1 && direction != -1) direction = 1;
      if (this.display.length) {
        if (direction == 1) date = new Date(this.display[this.display.length - 1]._id);
        else date = new Date(this.display[0]._id);
        i = 1;

      } else {
        date = new Date();
        i = 0;
      }
      var current;
      var newElement;
      for (; i < 7; i++) {
        current = addDays(date, i * direction);
        newElement = {
          title: format(current, "eeee d MMM", {
            locale: sv
          }),
          _id: format(current, "yyyy-MM-dd")
        }
        if (direction == 1) newElements.push(newElement);
        else newElements.unshift(newElement);
      }
      if (direction == 1) this.display.push(...newElements);
      else this.display.unshift(...newElements);
    }
  },
  components: {
    MenuDate
  }
}
</script>
