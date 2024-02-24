<template lang="pug">
div hoge
</template>
<script lang="js">
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hoge: 'hoge'
    }
  }
}
</script>