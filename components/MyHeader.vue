<template lang="pug">
header.header
  .to-top(v-if="showToTop")
    nuxt-link(to="/")
      i.far.fa-arrow-alt-circle-left.fa-2x
  .banner
    .title-outer
      h1.title(v-if="mapConfig && $i18n.locale === 'ja'")
        | {{mapConfig.map_title}}
      h1.title(v-else)
        | {{mapConfig.map_title_en}}
    .logo.print-exclude
      nuxt-link(to='/')
        img(src="~/assets/images/logo.png" width="895" height="160" :alt='$t("common.title")')
    .sub-outer.print-exclude
      .sub-button(@click='isOpenExplain=!isOpenExplain')
        i.fas.fa-info-circle.fa-lg
        a(:href="'/about'")
          | {{$t('common.about')}}
  .qrcode
    vue-qrcode(v-bind:value='fullURL' tag="img")
</template>
<script lang="js">
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  components: {
    VueQrcode
  },
  props: {
    mapConfig: {
      type: Object,
      required: true,
    },
    showToTop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fullURL: null,
    }
  },
  mounted () {
    this.fullURL = location.href
  },
  methods: {
    updateQRCode () {
      this.fullURL = location.href
    },
  }
}
</script>