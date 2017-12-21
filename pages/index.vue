<template>
  <section class="container">
    <div class="header">
      <a class="button" role="button" href="https://github.com/hayato-yamashita/neko-slideshow" target="_blank">
        <i class="fa fa-github fa-2x"></i>
      </a>
    </div>
    <div class="main">
      <div v-swiper:swiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="image in images" :key="image.url" :style="slideStyle(image)"></div>
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
    <div class="footer">
      <div class="tools">
        <autoplay :swiper="swiper"></autoplay>
        <refresh @refresh="refresh"></refresh>
      </div>
      <div>
        <i class="fa fa-heart-o"></i>
        Powered by <a href="https://cataas.com" target="_blank">Cataas</a>
      </div>
    </div>
  </section>
</template>

<script>
import autoplay from '~/components/autoplay.vue'
import refresh from '~/components/refresh.vue'

export default {
  components: {
    autoplay,
    refresh
  },
  created () {
    this.swiper = null
  },
  data () {
    return {
      images: [],
      swiperOption: {
        spaceBetween: 30,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        preloadImages: false,
        lazy: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        keyboard: {
          enabled: true
        },
        on: {
          init: this.init,
          slideChange: this.slideChange
        }
      }
    }
  },
  methods: {
    addImages (count) {
      for (let index = 0; index < count; index++) {
        this.$axios.get('https://cataas.com/cat', {
          responseType: 'blob',
          params: { random: Math.random() }
        })
          .then(response => {
            if (response.status === 200 && response.data.size > 0) {
              this.images.push({
                url: URL.createObjectURL(response.data)
              })
              if (this.images.length > 30) {
                URL.revokeObjectURL(this.images.shift().url)
                this.swiper.activeIndex--
              }
            } else {
              this.addImages(1)
            }
          })
      }
    },
    init () {
      this.addImages(5)
    },
    slideChange () {
      if (this.swiper.slides.length <= this.swiper.realIndex + 3) {
        this.addImages(1)
      }
    },
    slideStyle (image) {
      return {
        'background-image': 'url(' + image.url + ')'
      }
    },
    refresh () {
      this.images.forEach(image => { URL.revokeObjectURL(image.url) })
      this.images = []
      this.init()
    }
  }
}
</script>

<style>
html {
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;

  color: dimgray;
  background-color: ivory;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

a, .button {
  color: dimgray;
  text-decoration: none;
  transition: .15s ease-out;
}

a:hover, .button:hover {
  color: #d35400;
}

.button {
  border: 0;
  cursor: pointer;
  display: inline-flex;
  outline: none;
  position: relative;
  align-items: center;
  user-select: none;
  border-radius: 0;
  justify-content: center;
  background-color: transparent;
  font-size: inherit;
}

.container {
  display: flex;
  flex-direction: column;
}

.main {
  width: 100vw;
  height: 100vh;
  padding: 0;
}

.header {
  display: flex;
  justify-content: flex-end;
  top: 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  bottom: 0;
}

.header, .footer {
  padding: 0 1rem;
  position: absolute;
  z-index: 100;
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
}
.header:hover, .footer:hover {
  opacity: 1;
}

.header .button,
.footer .button {
  opacity: 0.3;
}
.header .button:hover,
.footer .button:hover {
  opacity: 1;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

@media screen and (max-width:425px) {
  .footer {
    height: 2rem;
    line-height: 2rem;
    font-size: 12px;
  }
}
</style>
