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
      <b-input-group>
        <b-form-input v-model="dish.link" ref="link" placeholder="Länk till recept" class="pr-0" />
        <b-input-group-append v-if="dish.link" @click="dish.link=''; $refs.link.$el.focus()">
          <b-input-group-text class="pl-0 pr-1">
            <b-icon icon="x-circle-fill" scale="0.7" class="cursor-pointer" />
          </b-input-group-text>
        </b-input-group-append>
        <b-input-group-append v-else>
          <b-input-group-text class="pl-0 pr-2">
            <b-icon icon="clipboard" scale="0.9" class="cursor-pointer" @click="pasteLink" />
          </b-input-group-text>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <b-button
      v-if="Object.keys(originalDish).length"
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
      if (!Object.keys(this.originalDish).length) {
        this.$store.dispatch("createDish", {
          id: this.$route.params.dishId,
          ...this.dish
        });
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
      }
      this.$router.go(-1);
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