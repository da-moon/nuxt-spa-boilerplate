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
  <b-form @submit.prevent="submit">
    <b-row align-h="end">
      <b-col class="text-right">
        <b-link :to="'/items'">{{$t('back')}}</b-link>
      </b-col>
    </b-row>
    <b-form-group :label="$t('items.field')">
      <b-form-input
        name="item[field]"
        ref="item"
        type="text"
        data-vv-delay="500"
        :placeholder="$t('items.field_placeholder')"
        @input="mergeItems({'field': $event})"
        :value="item.field"
      ></b-form-input>
      <b-form-invalid-feedback>{{$t('forms.errors.required')}}</b-form-invalid-feedback>
    </b-form-group>
    <b-btn class="my-3" type="submit">{{isUpdate() ? $t('update') : $t('save')}}</b-btn>
  </b-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "ItemForm",
  middleware: ["auth"],
  computed: {
    ...mapState("module", ["item", "items"])
  },
  methods: {
    ...mapMutations({ mergeItems: "module/mergeItems" }),
    isUpdate() {
      return this.item.hasOwnProperty("id");
    },
    submit() {
      let vm = this;
      let action = "module/" + (this.isUpdate() ? "update" : "create");
      this.$store.dispatch(action, this.item).then(resp => {
        let msg =
          resp.data.name +
          " " +
          vm.$t("item." + this.isUpdate() ? "updated" : "created");
        vm.$notify({ text: msg, type: "success", group: "alerts" });
        vm.$router.push("/items");
      });
    }
  }
};
</script>