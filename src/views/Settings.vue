<template>
  <b-container class="mt-2 mb-4 px-3 mt-md-4">
    <b-link class="float-left" @click="$router.go(-1)">
      <b-icon icon="chevron-left" scale="1.4" />Meny
    </b-link>
    <h1 class="h6 text-center pb-2 m-auto w-50">Mitt konto</h1>
    <b-row align-h="center">
      <b-col cols="12" md="8" lg="6">
        <div class="my-3">
          <b-avatar variant="dark" class="mr-2" />
          {{$store.state.user.email}}
        </div>
        <b-form @submit.prevent="update">
          <b-form-input
            class="my-2"
            type="password"
            required
            placeholder="Nuvarande lösenord"
            v-model="user.password"
          />
          <b-form-input
            class="my-2"
            type="password"
            minlength="8"
            required
            placeholder="Nytt lösenord"
            v-model="user.newPassword"
          />
          <b-button class="my-3" type="submit" block variant="primary">Byt lösenord</b-button>
        </b-form>
        <b-button variant="light" class="text-danger my-5" block @click="logout">Logga ut</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data: () => ({
    user: {
      password: "",
      newPassword: ""
    }
  }),
  metaInfo: {
    title: "Inställningar"
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    async update() {
      try {
        await this.$store.dispatch("updateUser", this.user);
        this.$swal({
          icon: "success",
          title: "Ditt lösenord har uppdaterats",
          timer: 1500,
          showConfirmButton: false
        });
        this.user.password = "";
        this.user.newPassword = "";
      } catch (err) {
        switch (err) {
          case 401:
            this.$swal({
              icon: "error",
              title: "Fel lösenord",
              timer: 1500,
              showConfirmButton: false
            });
            break;
          default:
            this.$swal({
              icon: "error",
              title: "Något gick fel",
              text: "Försök igen",
              timer: 1500,
              showConfirmButton: false
            });
        }
      }
    }
  }
};
</script>