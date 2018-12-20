const pkg = require("./package");
const i18n = require("./config/locales");
module.exports = {
  mode: "spa",
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["@/assets/scss/app.scss"],
  loading: { color: "#3B8070" },

  modules: [
    ["bootstrap-vue/nuxt", { css: false }],
    ["nuxt-i18n", i18n],
    ["@nuxtjs/axios"],
    ["@nuxtjs/auth"],
    ["@nuxtjs/moment"]
  ],
  plugins: [
    { src: "~/plugins/vue-notifications", ssr: false },
    { src: "~/plugins/vee-validate" },
    { src: "~/plugins/vue-moment" },
    { src: "~/plugins/axios.js" }
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post", propertyName: "jwt" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/users/1", method: "get", propertyName: "user" }
        }
      },
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID
      },
      facebook: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        userinfo_endpoint:
          process.env.FACEBOOK_USERINFO_ENDPOINT ||
          "https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday",
        scope: ["public_profile", "email", "user_birthday"]
      },
      google: {
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET
      },
      twitter: {
        client_id: process.env.TWITTER_CLIENT_ID
      }
    }
  },
  axios: {
    baseURL: process.env.API_URL || "http://localhost:3001/",
    redirectError: {
      401: "/login",
      404: "/notfound"
    }
  },
  build: {
    extend(config, { isDev, isClient }) {
      const vueLoader = config.module.rules.find(
        rule => rule.loader === "vue-loader"
      );
      vueLoader.options.transformToRequire = {
        img: "src",
        image: "xlink:href",
        "b-img": "src",
        "b-img-lazy": ["src", "blank-src"],
        "b-card": "img-src",
        "b-card-img": "img-src",
        "b-carousel-slide": "img-src",
        "b-embed": "src"
      };
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
