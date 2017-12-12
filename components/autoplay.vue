<template>
  <button type="button" class="button" @click="toggle()">
    <i class="fa fa-fw" :class="buttonIcon"></i>{{ buttonLabel }}
  </button>
</template>

<script>
export default {
  props: {
    swiper: {
      required: true
    }
  },
  data () {
    return {
      isRunning: true
    }
  },
  methods: {
    toggle () {
      this.isRunning ? this.swiper.autoplay.stop() : this.swiper.autoplay.start()
      this.isRunning = !this.isRunning
    }
  },
  computed: {
    buttonIcon () {
      return this.isRunning ? 'fa-stop' : 'fa-play'
    },
    buttonLabel () {
      return this.isRunning ? 'Stop' : 'Play'
    }
  }
}
</script>
