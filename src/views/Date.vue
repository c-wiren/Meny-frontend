<template>
  <div class="page">
    <b-container class="mt-2 mb-4 px-3 mt-md-4" fluid="lg">
      <div class="position-relative">
        <b-link class="position-absolute" @click="$router.go(-1)">
          <b-icon icon="chevron-left" scale="1.4" />Meny
        </b-link>
        <h1 class="h6 text-center">{{dateString}}</h1>
      </div>
      <b-row align-h="center">
        <b-col cols="12" md="8" lg="6">
          <b-card
            v-for="dish in dishes"
            img-top
            :img-src="dish.image"
            :key="dish.id"
            class="my-4 border-0 shadow-lg position-relative"
          >
            <b-dropdown right no-caret variant="link" class="edit-food">
              <template v-slot:button-content>
                <b-icon icon="three-dots-vertical" scale="1.3" class="edit-food-button" />
              </template>
              <b-dropdown-item :to="$route.path + '/edit/' + dish.id">
                <b-icon icon="pencil-square" />Redigera
              </b-dropdown-item>
              <b-dropdown-item @click="removeDish(dish.id)">
                <b-icon icon="x" scale="1.2" />Ta bort
              </b-dropdown-item>
            </b-dropdown>
            <b-card-text>
              <div class="h6">{{dish.name}}</div>
              <small v-html="dish.description"></small>
            </b-card-text>
            <a
              class="d-flex px-3 py-2 justify-content-between align-items-center border rounded"
              v-if="dish.link"
              :href="dish.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="text-nowrap overflow-hidden">
                <div class="small text-truncate">{{dish.metaSite ? dish.metaSite : "Recept"}}</div>
                <div
                  class="small text-dark text-truncate"
                >{{dish.metaTitle ? dish.metaTitle : dish.name}}</div>
              </div>
              <b-icon scale="1.3" icon="chevron-right" />
            </a>
          </b-card>
          <div class="my-5">
            <b-button :to="$route.path + '/add'" variant="link" class="text-secondary" block>
              <b-icon icon="plus" scale="2" />
              <small class="d-block my-1 text-decoration-none">Lägg till</small>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="$route.name != 'Date'" class="overlay" style="z-index: 1000">
      <router-view class="bg-white rounded-top pt-2" :date="$route.params.date" />
    </div>
  </div>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: this.dateString
    };
  },
  methods: {
    async removeDish(id) {
      var accept = await this.$swal({
        icon: "question",
        title: "Är du säker?"
      });
      if (accept.isDismissed) return;
      const payload = {
        dateId: this.$route.params.date,
        dishId: id
      };
      this.$store.dispatch("removeDish", payload);
    }
  },
  computed: {
    dateString() {
      const date = new Date(this.$route.params.date);
      return format(date, "eeee d MMM", {
        locale: sv
      });
    },
    date() {
      return this.$store.state.dates[this.$route.params.date];
    },
    dishes() {
      if (this.date && this.date.dishIds) {
        var dishes = [];
        for (var i in this.date.dishIds) {
          var dish = this.$store.state.dishes[this.date.dishIds[i]];
          if (!dish.deleted) dishes.push(dish);
        }
        return dishes;
      } else return null;
    }
  }
};
import { format } from "date-fns";
import { sv } from "date-fns/locale";
</script>
<style>
.edit-food {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  padding: 0 !important;
}

.edit-food .dropdown-toggle {
  padding: 0;
}

.edit-food-button {
  background-color: #0005;
  color: white;
  border-radius: 100px;
  padding: 0.3rem;
  width: 1.6rem;
  height: 1.6rem;
}

.dropdown-menu {
  border: 0;
  box-shadow: 0 20px 120px #000c;
  min-width: 0 !important;
  background-color: #fffe;
}
.overlay {
  background-color: #0009;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.overlay > div {
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  overflow-y: scroll;
}
.card-img-top {
  max-height: 230px;
  object-fit: cover;
}
</style>
