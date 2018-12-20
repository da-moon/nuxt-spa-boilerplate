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
  <b-card title="Social Login" bg-variant="light">
    <div v-for="s in strategies" :key="s.key" class="mb-2">
      <b-btn
        @click="$auth.loginWith(s.key)"
        block
        :style="{background: s.color}"
        class="login-button"
      >Login with {{ s.name }}</b-btn>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "SocialLogin",
  computed: {
    strategies: () => [
      { key: "auth0", name: "Auth0", color: "#ec5425" },
      { key: "google", name: "Google", color: "#4284f4" },
      { key: "facebook", name: "Facebook", color: "#3c65c4" },
      { key: "github", name: "GitHub", color: "#202326" }
    ]
  }
};
</script>

<style scoped>
</style>