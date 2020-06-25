<template>
  <b-container class="mt-2 mb-4 px-3 mt-md-4">
    <div v-if="!validation">
      <b-link class="float-left" @click="$router.go(-1)">
        <b-icon icon="chevron-left" scale="1.4" />Tillbaka
      </b-link>
      <h1 class="h6 text-center pb-2 m-auto w-50">Skapa konto</h1>
      <b-row align-h="center">
        <b-col cols="12" md="8" lg="6">
          <b-form class="my-3" @submit.prevent="validate">
            <b-form-input v-model="user.firstName" required placeholder="Förnamn" class="my-2" />
            <b-form-input v-model="user.lastName" required placeholder="Efternamn" class="my-2" />
            <b-form-input
              v-model="user.email"
              required
              placeholder="E-postadress"
              type="email"
              class="my-2"
            />
            <b-form-input
              v-model="user.password"
              required
              placeholder="Lösenord"
              minlength="8"
              type="password"
              class="my-2"
            />
            <b-button
              block
              type="submit"
              variant="primary"
              class="my-4"
              :disabled="loading"
            >{{loading ? "Skapar konto..." : "Skapa konto"}}</b-button>
          </b-form>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <h2>Verifiera e-post</h2>
      <p>Ett mail har skickats till {{user.email}} med en fyrsiffrig kod.</p>
      <b-form @submit.prevent="confirm">
        <b-form-input
          v-model="code"
          required
          placeholder="Verifieringskod"
          minlength="4"
          maxlength="4"
          type="number"
          class="my-2"
        />
        <b-button
          block
          type="submit"
          variant="primary"
          :disabled="loading"
          class="my-4"
        >{{loading ? "Bekräftar..." : "Bekräfta"}}</b-button>
      </b-form>
    </div>
  </b-container>
</template>
<script>
export default {
  data: () => ({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    token: null,
    code: "",
    loading: false,
    validation: false
  }),
  methods: {
    async validate() {
      try {
        if (this.validation) this.loading = true;
        this.token = await this.$store.dispatch("validate", this.user.email);
        this.loading = false;
        this.validation = true;
      } catch (err) {
        this.loading = false;
        switch (err) {
          case 409:
            this.$swal({
              icon: "error",
              title: "E-postadressen är redan registrerad",
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
    },
    async confirm() {
      try {
        this.loading = true;
        await this.$store.dispatch("signup", {
          ...this.user,
          code: parseInt(this.code),
          token: this.token
        });
        this.loading = false;
        this.$router.replace({ name: "Menu" });
      } catch (err) {
        this.loading = false;
        switch (err) {
          case 401:
            this.$swal({
              icon: "error",
              title: "Koden är felaktig",
              timer: 1500,
              showConfirmButton: false
            });
            break;
          case 403:
            var accept = await this.$swal({
              icon: "error",
              title: "Koden har utgått",
              text: "Vill du skicka en ny kod?"
            });
            if (accept.isDismissed) break;
            this.validate();
            break;
          case 409:
            this.$swal({
              icon: "error",
              title: "E-postadressen är redan registrerad",
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