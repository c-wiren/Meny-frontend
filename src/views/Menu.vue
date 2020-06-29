<template>
  <div class="page">
    <b-container class="px-3 mb-5 mt-md-2" fluid="lg">
      <b-link to="/dishes" class="pt-4 float-left" @click="() => scroll = 0">Rätter</b-link>
      <b-link class="pt-4 float-right" @click="() => scroll = 0">Idag</b-link>
      <div class="text-center py-1 pb-2 w-50 m-auto">
        <img width="70" src="/logo2.png" @click="() => scroll = 0" class="cursor-pointer" />
      </div>
      <b-row align-h="center">
        <b-col cols="12" md="8" lg="6">
          <b-form-spinbutton
            v-model="scroll"
            :formatter-fn="() => 'Vecka ' + display.week"
            min="-100"
            max="100"
          ></b-form-spinbutton>
          <MenuDate
            :dateId="date.date"
            :title="date.title"
            :today="date.date == today"
            v-for="date in display.days"
            :key="date.date"
          />
          <b-button variant="light" class="text-dark mt-5" to="/settings">
            <b-icon icon="gear-fill" class="mr-2" />Inställningar
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { format, addDays } from "date-fns";
import { sv } from "date-fns/locale";
import MenuDate from "@/components/MenuDate";
export default {
  metaInfo: {
    title: "Meny"
  },
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
      date = addDays(date, ((-1 * (date.getDay() + 6)) % 7) + this.scroll * 7);
      var newElements = [];
      var current;
      var newElement;
      for (var i = 0; i < 7; i++) {
        current = addDays(date, i);
        newElement = {
          title: format(current, "eeee d MMM", {
            locale: sv
          }),
          date: format(current, "yyyy-MM-dd")
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
