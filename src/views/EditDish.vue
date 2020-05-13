<template>
  <b-container class="my-4 px-4">
    <div class="pb-3">
      <b-link @click="$router.go(-1)" class="float-left">Avbryt</b-link>
      <b-link
        @click="done"
        :disabled="!dish.name || (dish.name == originalDish.name && dish.description == originalDish.description && dish.link == originalDish.link)"
        class="float-right"
      >Klar</b-link>
    </div>
    <b-form id="form" class="py-3">
      <div v-if="dish.image" class="text-center my-2">
        <img :src="dish.image" class="w-50 rounded" />
        <b-link class="d-block my-1">Ändra</b-link>
      </div>
      <b-form-input class="my-2" v-model="dish.name" placeholder="Namn" />
      <b-form-textarea
        class="my-2"
        v-model="dish.description"
        rows="2"
        max-rows="6"
        placeholder="Beskrivning"
      />
      <b-form-input v-model="dish.link" placeholder="Länk till recept" />
    </b-form>
  </b-container>
</template>
<script>
export default {
  created() {
    if (
      this.$route.params.dishId != this.$store.state.newDish &&
      !this.$store.state.dishes[this.$route.params.dishId]
    ) {
      this.$router.replace("/404");
    }
  },
  methods: {
    done() {
      if (!Object.keys(this.originalDish).length) {
        this.$store.commit("createDish", {
          _id: this.$route.params.dishId,
          description: null,
          link: null,
          image: null,
          ...this.dish
        });
      } else {
        this.$store.commit("updateDish", this.dish);
      }
      var navigateTo;
      switch (this.$route.name) {
        case "EditDish":
          navigateTo = "Dish";
          break;
        case "DateEditDish":
          navigateTo = "Date";
          break;
        case "DateAddEditDish":
          navigateTo = "DateDish";
          break;
      }
      this.$router.replace({ name: navigateTo });
    }
  },
  data() {
    return {
      originalDish: { ...this.$store.state.dishes[this.$route.params.dishId] },
      dish: { ...this.$store.state.dishes[this.$route.params.dishId] }
    };
  }
};
</script>