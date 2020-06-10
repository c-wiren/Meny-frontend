<template>
  <b-container class="mt-2 mb-4 px-3">
    <b-link class="float-left" @click="$router.go(-1)">
      <b-icon icon="chevron-left" scale="1.4" />Tillbaka
    </b-link>
    <h1 class="h6 text-center pb-2 m-auto w-50">Logga in</h1>
    <b-form class="my-3" @submit.prevent="login">
      <b-form-input v-model="user.email" placeholder="E-postadress" class="my-2" />
      <b-form-input v-model="user.password" placeholder="Lösenord" type="password" class="my-2" />
      <b-button
        block
        type="submit"
        variant="primary"
        class="my-4"
      >{{loggingIn ? "Loggar in..." : "Logga in"}}</b-button>
    </b-form>
  </b-container>
</template>
<script>
export default {
  metaInfo: {
    title: "Logga in"
  },
  created() {
    if (this.$store.state.user) this.$router.replace("/menu");
  },
  data: () => ({
    user: {
      email: "",
      password: ""
    },
    loggingIn: false
  }),
  methods: {
    async login() {
      this.loggingIn = true;
      try {
        await this.$store.dispatch("login", this.user);
        this.loggingIn = false;
        this.$router.replace({ name: "Menu" });
      } catch (err) {
        this.loggingIn = false;
        switch (err) {
          case 401:
            alert("Fel uppgifter!");
            break;
          default:
            alert("Något gick fel!");
        }
      }
    }
  }
};
</script>