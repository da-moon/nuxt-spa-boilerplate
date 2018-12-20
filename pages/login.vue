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
  <div>
    <h2 class="text-center">Login</h2>
    <hr>
    <b-alert v-if="error" show variant="danger">{{ error + '' }}</b-alert>
    <b-alert show v-if="$auth.$state.redirect">
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" align-v="center">
      <b-col md="4">
        <LoginMicroservice/>
      </b-col>
      <b-col md="1">
        <div class="text-center">
          <b-badge pill>OR</b-badge>
        </div>
      </b-col>
      <b-col md="4" class="text-center pt-4">
        <SocialLogin/>
      </b-col>
    </b-row>
  </div>
  <!-- <login v-if="!$auth.loggedIn"></login> -->
</template>
<style scoped>
.h-60 {
  height: 60vh;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
<script>
import LoginMicroservice from "~/components/LoginMicroservice.vue";
import SocialLogin from "~/components/SocialLogin.vue";

export default {
  middleware: ["auth"],
  options: {
    auth: false
  },
  components: {
    LoginMicroservice,
    SocialLogin
  },
  data() {
    return {
      error: null
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.go("/");
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      );
    },
    isCallback() {
      return Boolean(this.$route.query.callback);
    }
  }
};
</script>
