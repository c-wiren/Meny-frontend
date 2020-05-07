<template>
  <div class="page">
    <b-container class="px-4 my-2 mb-4">
      <b-link to="/dishes" class="pt-3 float-left" @click="() => scroll = 0">Rätter</b-link>
      <b-link class="pt-3 float-right" @click="() => scroll = 0">Idag</b-link>
      <div class="text-center py-1 w-50 m-auto">
        <img width="90" src="/logo.png" />
      </div>
      <b-form-spinbutton
        v-model="scroll"
        :formatter-fn="() => 'Vecka ' + display.week"
        min="-100"
        max="100"
      ></b-form-spinbutton>
      <MenuDate
        :_id="date._id"
        :title="date.title"
        :today="date._id == today"
        v-for="date in display.days"
        :key="date._id"
      />
    </b-container>
  </div>
</template>

<script>
import { format, addDays } from "date-fns";
import { sv } from "date-fns/locale";
import MenuDate from "@/components/MenuDate";
export default {
  name: "Menu",
  data: function() {
    return {
      today: format(new Date(), "yyyy-MM-dd"),
      scroll: 0
    };
  },
  computed: {
    display() {
      var date = new Date();
      date = addDays(date, date.getDay() * -1 + 1 + this.scroll * 7);
      var newElements = [];
      var current;
      var newElement;
      for (var i = 0; i < 7; i++) {
        current = addDays(date, i);
        newElement = {
          title: format(current, "eeee d MMM", {
            locale: sv
          }),
          _id: format(current, "yyyy-MM-dd")
        };
        newElements.push(newElement);
      }
      return { days: newElements, week: format(date, "w") };
    }
  },
  components: {
    MenuDate
  }
};
</script>
