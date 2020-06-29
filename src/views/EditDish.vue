<template>
  <b-container class="mt-2 mb-4 mt-md-4 px-3" fluid="lg">
    <div class="pb-3">
      <b-link @click="$router.go(-1)" class="float-left">Avbryt</b-link>
      <b-link
        @click="done"
        :disabled="!dish.name || (dish.name == originalDish.name && dish.description == originalDish.description && dish.link == originalDish.link)"
        class="float-right"
      >Klar</b-link>
    </div>
    <b-row align-h="center">
      <b-col cols="12" md="8" lg="6">
        <b-form id="form" class="py-3">
          <div v-if="dish.image" class="text-center my-2">
            <img :src="dish.image" class="w-50 rounded" />
            <b-link class="d-block my-1">Ändra</b-link>
          </div>
          <b-form-input class="my-2" v-model="dish.name" placeholder="Namn" autocomplete="off" />
          <b-form-textarea
            class="my-2"
            v-model="dish.description"
            rows="2"
            max-rows="6"
            placeholder="Beskrivning"
          />
          <b-input-group>
            <b-form-input
              type="url"
              v-model="dish.link"
              ref="link"
              placeholder="Länk till recept"
              class="pr-0"
              autocomplete="off"
            />
            <b-input-group-append v-if="dish.link" @click="dish.link=''; $refs.link.$el.focus()">
              <b-input-group-text class="pl-0 pr-1">
                <b-icon icon="x-circle-fill" scale="0.8" class="cursor-pointer text-muted" />
              </b-input-group-text>
            </b-input-group-append>
            <b-input-group-append v-else>
              <b-input-group-text class="pl-0 pr-2">
                <b-icon
                  icon="clipboard"
                  scale="0.8"
                  class="cursor-pointer text-muted"
                  @click="pasteLink"
                />
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </b-form>
      </b-col>
    </b-row>
    <b-button
      v-if="Object.keys(originalDish).length && this.$route.name == 'EditDish'"
      @click="remove"
      class="mt-5 text-danger"
      variant="light"
    >Radera rätt</b-button>
  </b-container>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: Object.keys(this.originalDish).length
        ? "Redigera rätt"
        : "Skapa rätt"
    };
  },
  created() {
    if (
      this.$route.params.dishId != this.$store.state.newDish &&
      !this.$store.state.dishes[this.$route.params.dishId]
    ) {
      this.$router.replace("/404");
    }
  },
  methods: {
    pasteLink() {
      this.$refs.link.$el.focus();
      document.execCommand("paste");
    },
    async remove() {
      var accept = await this.$swal({
        icon: "question",
        title: "Är du säker?",
        text: "Rätten raderas permanent"
      });
      if (accept.isDismissed) return;
      this.$store.dispatch("updateDish", { id: this.dish.id, deleted: true });
      this.$router.go(-1);
    },
    done() {
      // Trim spaces
      if (this.dish.name) this.dish.name = this.dish.name.trim();
      if (this.dish.description)
        this.dish.description = this.dish.description.trim();
      if (this.dish.image) this.dish.image = this.dish.image.trim();
      if (this.dish.link) this.dish.link = this.dish.link.trim();

      // If creating new dish
      if (!Object.keys(this.originalDish).length) {
        this.$store.dispatch("createDish", {
          id: this.$route.params.dishId,
          ...this.dish
        });
        // If creating new dish inside Date view
        if (this.$route.name == "DateAddEditDish") {
          this.$router.replace({
            name: "DateDish",
            params: { dishId: this.$route.params.dishId }
          });
          // If not
        } else {
          this.$router.replace({
            name: "Dish",
            params: { dishId: this.$route.params.dishId }
          });
        }
        // If editing existing dish
      } else {
        var dish = { id: this.dish.id };
        if (this.dish.name != this.originalDish.name)
          dish.name = this.dish.name;
        if (this.dish.description != this.originalDish.description)
          dish.description = this.dish.description;
        if (this.dish.link != this.originalDish.link) {
          dish.link = this.dish.link;
          dish.metaTitle = "";
          dish.metaSite = "";
        }
        if (this.dish.image != this.originalDish.image)
          dish.image = this.dish.image;
        this.$store.dispatch("updateDish", dish);
        this.$router.go(-1);
      }
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