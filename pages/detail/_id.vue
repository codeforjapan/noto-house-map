<template lang="pug">
div.layout-map
  div.layout-map-inner      
    main.main.col-12_md-9_xl-6
      .main-sheet
        my-header(:mapConfig='mapConfig')
        item-detail(:mapConfig='mapConfig', :itemId='itemid' v-if="mapConfig")
        footer.footer
          .footer-logo
            img(src="~/assets/images/logo.png" width="895" height="160" :alt='$t("common.title")')
  modal(v-bind:isOpen='isOpenExplain' v-on:closeModal="closeModalMethod")
</template>

<script lang="js">
import VueQrcode from '@chenfengyuan/vue-qrcode'
import MyHeader from '~/components/MyHeader'
import ItemDetail from '~/components/ItemDetail'
import { getNowYMD } from '~/lib/displayHelper.ts'
import Modal from '~/components/Modal'
if (process.client) {
  require('viewport-units-buggyfill').init()
}

export default {
  components: {
    ItemDetail, VueQrcode, Modal, MyHeader
  },
  asyncData ({ app }) {
    const locale = app.i18n.locale
    const updated_at = getNowYMD(new Date(), locale)
    return { updated_at }
  },
  data () {
    return {
      mapConfig: require('~/assets/config/2024-noto-houses'),
      itemid: this.$nuxt.$route.params.id,
      locale: null,
      isOpenExplain: false,
      updated_at: null
    }
  },
  head () {
    let title, description
    const image = this.mapConfig.map_image ? this.mapConfig.map_image : 'logo.png'
    switch (this.$i18n.locale) {
      case 'ja':
        title = this.mapConfig.map_title
        description = this.mapConfig.map_description
        break
      case 'en':
        title = this.mapConfig.map_title_en
        description = this.mapConfig.map_description_en
        break
      default:
        title = this.mapConfig.map_title_en
        description = this.mapConfig.map_description_en
        break
    }
    return {
      title: title + ' - ' + this.$i18n.t('common.site_name'),
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:image', property: 'og:image', content: 'https://kamimap.com/images/' + image },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:title', name: 'og:title', content: title + this.$i18n.t('common.site_name') }
      ]
    }
  },
  methods: {
    closeModalMethod () {
      this.isOpenExplain = false
    }
  }
}
</script>
