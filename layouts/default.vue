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
    <b-navbar toggleable="md" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Brand</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/public">Public</b-nav-item>
          <b-nav-item to="/secure">Secure</b-nav-item>
          <b-nav-item to="/items">{{$t('items.plural')}}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-dropdown-item disabled>User status:
            <b-badge>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</b-badge>
          </b-dropdown-item>
          <template v-if="$auth.$state.loggedIn">
            <b-nav-item-dropdown :text="$auth.user.name" right>
              <b-dropdown-item @click="$auth.logout()">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-img :src="picture" class="mt-1" rounded="circle" width="30px" height="30px"/>
          </template>
          <template v-else>
            <b-dropdown-item to="/login">Login</b-dropdown-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="mt-4">
      <nuxt/>
    </b-container>
  </div>
</template>

<script>
import dotProp from "dotprop";

export default {
  computed: {
    picture() {
      return (
        dotProp(this.$auth.user, "picture") || // OpenID
        dotProp(this.$auth.user, "picture.data.url") || // Facebook graph API
        dotProp(this.$auth.user, "avatar_url")
      ); // GitHub
    }
  }
};
</script>
