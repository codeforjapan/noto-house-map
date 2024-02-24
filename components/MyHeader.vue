<template lang="pug">
header.header
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
        span
          | {{$t('common.about')}}
      .sub-button
        i.fas.fa-language.fa-lg
        select(onChange="location.href=value;")
          option.language(disabled selected)
            | Language: {{$i18n.locales.filter((i) => { return i.code === $i18n.locale })[0].name}}
          option(v-for="locale in $i18n.locales" :value="switchLocalePath(locale.code)")
            | {{ locale.name }}
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