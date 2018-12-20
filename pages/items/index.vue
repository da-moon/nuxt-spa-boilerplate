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
  <b-row>
    <b-col>
      <!-- <b-container fluid> -->
      <b-row>
        <b-col md="10">
          <b-alert show variant="warning">This is a secure page!</b-alert>
        </b-col>
        <b-col md="2">
          <b-btn
            class="custom-bottom"
            block
            variant="outline-success"
            :to="'/items/new'"
          >{{$t('items.new')}}</b-btn>
        </b-col>
      </b-row>
      <!-- </b-container> -->
      <b-table striped hover :items="items" :fields="fields">
        <template slot="name" slot-scope="data">
          <b-link :to="`/items/${data.item.id}/edit`">{{data.item.name}}</b-link>
        </template>
        <template slot="members" slot-scope="data">{{data.item.users.length}}</template>
        <template
          slot="updated_at"
          slot-scope="data"
        >{{data.item.updated_at | moment("from", "now")}}</template>
        <template slot="actions" slot-scope="data">
          <b-btn variant="primary" :to="'items/'+data.item.id+'/edit'">{{$t('edit')}}</b-btn>&nbsp;
          <b-btn
            variant="outline-secondary"
            @click="id = data.item.id"
            v-b-modal.confirmremove
          >{{$t('remove')}}</b-btn>
        </template>
      </b-table>
      <b-modal
        id="confirmremove"
        :title="$t('remove_confirm_title')"
        @ok="remove"
      >{{$t('remove_confirm')}}</b-modal>
    </b-col>
  </b-row>
</template>
    
<style scoped>
.custom-bottom {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
}
</style>
<script>
import { mapState } from "vuex";

export default {
  async fetch({ store }) {
    await store.dispatch("module/get");
  },
  middleware: ["auth"],
  computed: {
    ...mapState({
      items: state => {
        return state.module.items;
      }
    })
  },
  data() {
    return {
      id: 0,
      fields: [
        {
          key: "field",
          label: this.$t("items.field"),
          sortable: true
        },
        {
          key: "updated_at",
          sortable: true,
          label: this.$t("updated_at")
        },
        {
          key: "actions",
          label: this.$t("actions")
        }
      ]
    };
  },
  methods: {
    remove() {
      this.$store
        .dispatch("module/delete", { id: this.id })
        .then(() => this.$store.dispatch("module/get"));
    }
  }
};
</script>