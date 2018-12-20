/*The MIT License (MIT)
* Copyright (c) 2018 Damoon Azarpazhooh
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the
* Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice
* shall be included in all copies or substantial portions of
* the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
* ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
* THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
* OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
* OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
* OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
<template>
  <b-card bg-variant="light" v-if="!$auth.loggedIn" :title="$t('users.sessions.new.title')">
    <busy-overlay/>
    <b-form @submit.prevent="login" method="post">
      <b-form-group id="emailGroup" :label="$t('email')" label-for="emailInput">
        <b-form-input
          id="emailInput"
          name="user[email]"
          type="email"
          v-model="form.email"
          required
          autofocus
          :placeholder="$t('email')"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="passwordGroup" :label="$t('password')" label-for="passwordInput">
        <b-form-input
          id="passwordInput"
          name="user[password]"
          type="password"
          v-model="form.password"
          required
          :placeholder="$t('password')"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="rememberMeCheckbox">
        <b-form-checkbox v-model="form.rememberme" id="rememberMe">{{$t('remember_me')}}</b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">{{$t('login')}}</b-button>
      <hr>
    </b-form>
    <b-row>
      <b-col>
        <b-link :to="{path: 'register'}">{{$t('users.registrations.new.title')}}</b-link>
      </b-col>
      <b-col class="text-right">
        <b-link :to="{path: 'reset-password'}">{{$t('forgot_password')}}</b-link>
      </b-col>
    </b-row>
  </b-card>
</template>
<style scoped>
.login-button {
  border: 0;
}
</style>

<script>
import BusyOverlay from "~/components/BusyOverlay.vue";

export default {
  name: "LoginMicroservice",
  components: {
    BusyOverlay
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        rememberme: false
      }
    };
  },
  methods: {
    async login() {
      await this.$store
        .dispatch("user/login", this.form)
        .then(this.success)
        .catch(this.unauthorized);
    },
    success() {
      this.$notify({ group: "alerts", text: this.$t("users.sessions.valid") });
      this.$router.push("/");
    },
    unauthorized() {
      this.$notify({
        group: "alerts",
        text: this.$t("users.sessions.invalid")
      });
    }
  }
};
</script>
