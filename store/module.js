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
import merge from "lodash.merge";
import assign from "lodash.assign";
export const state = () => ({
  items: [],
  item: {}
});
export const getters = {
  arrayLength(state) {
    return state.items.length;
  },
  items(state) {
    return state.items;
  },
  arraySpecific(state) {
    return state.items.filter(item => item.id === "2");
  }
};
export const mutations = {
  set(state, payload) {
    state.items = payload;
  },
  add(state, payload) {
    merge(state.items, payload);
  },
  remove(state, { item }) {
    state.list.filter(request => item.id !== request.id);
  },
  mergeItems(state, payload) {
    assign(state.item, payload);
  },
  setItems(state, payload) {
    state.item = payload;
  }
};
export const actions = {
  async get({ commit }) {
    await this.$axios.get("items").then(res => {
      if (res.status === 200) {
        commit("set", res.data);
      }
    });
  },
  async show({ commit }, params) {
    await this.$axios.get(`items/${params.item_id}`).then(res => {
      if (res.status === 200) {
        commit("setItems", res.data);
      }
    });
  },
  async set({ commit }, item) {
    await commit("set", item);
  },
  async form({ commit }, form) {
    await commit("mergeItems", form);
  },
  async add({ commit }, item) {
    await commit("add", item);
  },
  async create(params) {
    return await this.$axios.post(`/items`, {
      field: params.field,
      updated_at: this.$moment().format("YYYY-MM-DD HH:mm:ss")
    });
  },
  async update(params) {
    return await this.$axios.put(`/items/${params.id}`, {
      field: params.field,
      updated_at: this.$moment().format("YYYY-MM-DD HH:mm:ss")
    });
  },
  async delete(params) {
    return await this.$axios.delete(`/items/${params.id}`);
  }
};
