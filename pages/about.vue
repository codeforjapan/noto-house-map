<template lang="pug">
div.layout-map
  div.layout-map-inner      
    main.main.col-12_md-9_xl-6
      .main-sheet
        my-header(:mapConfig='mapConfig', showToTop=true)
        h1 このサイトについて
        p
        | このサイトは、能登半島地震で被災された方が受けられる住まいの支援のうち、みなし仮設（賃貸型応急）住宅の対象物件を、地図上で検索する機能を備えています。
        | 一般社団法人コード・フォー・ジャパン（以下Code for Japan） が、石川県との連携協定の一貫で提供しています。
        p
        | 物件情報は、石川県より直接提供されたものを表示しています。
        p
        | 物件に関するお問い合わは、物件情報にある連絡先に直接お問い合わせください。
        | また、このサイトは、地図上で物件を検索するための機能を提供しているだけであり、Code for Japan では物件の内容についての保証はいたしません。
        | 制度そのものや、被災支援については、石川県のホームページなどからお問い合わせください。
        p
          a(href="https://www.pref.ishikawa.lg.jp/kenju/saigai_portal.html" target="_blank" rel="noopener noreferrer") 石川県のホームページ
        footer.footer
          .footer-logo
            img(src="~/assets/images/logo.png" width="895" height="160" :alt='$t("common.title")')
</template>
<script lang="js">
import MyHeader from '~/components/MyHeader'

export default {
  components: {
    MyHeader
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
}
</script>

