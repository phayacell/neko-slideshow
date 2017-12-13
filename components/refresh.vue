<template>
  <button type="button" class="button" @click="refresh()">
    <i class="fa fa-fw fa-refresh refresh"></i>Refresh
  </button>
</template>

<script>
export default {
  methods: {
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>
