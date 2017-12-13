module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'neko-slideshow',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ネコ画像を延々スライドショーするだけのサービス' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Quicksand' }
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /**
     * Run ESLint on save
     */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '~/plugins/swiper', ssr: false }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
    '@nuxtjs/google-analytics'
  ],
  css: [
    'swiper/dist/css/swiper.min.css'
  ],
  'google-analytics': {
    id: 'UA-111203407-1'
  }
}
