// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // nuxt.config.js
  runtimeConfig: {
    public: {
      baseUrl: "http://52.66.203.14:9000",
    },
  },
});
