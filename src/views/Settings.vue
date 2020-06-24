<template>
  <b-container class="my-4 px-3">
    <b-link class="float-left" @click="$router.go(-1)">
      <b-icon icon="chevron-left" scale="1.4" />Meny
    </b-link>
    <h1 class="h6 text-center pb-2 m-auto w-50">Mitt konto</h1>
    <div class="my-3">
      <b-avatar variant="dark" class="mr-2" />
      {{$store.state.user.email}}
    </div>
    <b-form @submit.prevent>
      <b-form-input class="my-2" placeholder="Nuvarande lösenord" />
      <b-form-input class="my-2" placeholder="Nytt lösenord" />
      <b-button class="my-3" type="submit" block variant="primary">Byt lösenord</b-button>
    </b-form>
    <b-button variant="light" class="text-danger my-5" block @click="logout">Logga ut</b-button>
  </b-container>
</template>
<script>
export default {
  metaInfo: {
    title: "Inställningar"
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>