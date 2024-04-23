(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{380:function(t,o,e){t.exports=e.p+"img/logo.681bcf8.png"},381:function(t){t.exports=JSON.parse('{"map_id":"2024-noto-houses","map_title":"能登半島地震 物件サポート情報","map_title_en":"Noto Peninsula Earthquake Housing Support (2024)","map_description":"物件サポート情報です","map_description_en":"Property support information","map_image":"ogp_2024-noto-earthquake.png","sources":[{"id":"properties","url":"https://noto.kamimap.com/data/xls/noto.xlsx","link":"/data/xls/noto.xlsx","type":"xlsx","title":"賃貸物件","categoryColumn":"住居タイプ","nameColumn":"住宅名","show":true}],"default_hash":"36.40516511069464,135.94428673603926-36.18692245699195,136.76177461288665","center":[136.3614086,36.2912169],"type":"Excel","layer_settings":{"共同住宅":{"name":"共同住宅","name_en":"Share House","color":"#4f4f5a","bg_color":"#B7B7BE","icon_class":"fa-solid fa-warehouse","class":"layer_gs_ok"},"一戸建て":{"name":"一戸建て","name_en":"House","color":"#4f4f5a","bg_color":"#e7a9BE","icon_class":"fa-solid fa-house","class":"layer_house"},"メゾネット":{"name":"メゾネット","name_en":"Maisonette","color":"#4f4f5a","bg_color":"#B7B7BE","icon_class":"fa-solid fa-map-pin","class":"layer_gs_ok"}}}')},383:function(t,o,e){"use strict";var n=e(384),l={components:{VueQrcode:e.n(n).a},props:{mapConfig:{type:Object,required:!0},showToTop:{type:Boolean,default:!1}},data:function(){return{fullURL:null}},mounted:function(){this.fullURL=location.href},methods:{updateQRCode:function(){this.fullURL=location.href}}},r=e(35),component=Object(r.a)(l,(function(){var t=this,o=t._self._c;return o("header",{staticClass:"header"},[t.showToTop?o("div",{staticClass:"to-top"},[o("nuxt-link",{attrs:{to:"/"}},[o("i",{staticClass:"far fa-arrow-alt-circle-left fa-2x"})])],1):t._e(),o("div",{staticClass:"banner"},[o("div",{staticClass:"title-outer"},[t.mapConfig&&"ja"===t.$i18n.locale?o("h1",{staticClass:"title"},[t._v(t._s(t.mapConfig.map_title))]):o("h1",{staticClass:"title"},[t._v(t._s(t.mapConfig.map_title_en))])]),o("div",{staticClass:"logo print-exclude"},[o("nuxt-link",{attrs:{to:"/"}},[o("img",{attrs:{src:e(380),width:"895",height:"160",alt:t.$t("common.title")}})])],1),o("div",{staticClass:"sub-outer print-exclude"},[o("div",{staticClass:"sub-button",on:{click:function(o){t.isOpenExplain=!t.isOpenExplain}}},[o("i",{staticClass:"fas fa-info-circle fa-lg"}),o("a",{attrs:{href:"/about"}},[t._v(t._s(t.$t("common.about")))])])])]),o("div",{staticClass:"qrcode"},[o("vue-qrcode",{attrs:{value:t.fullURL,tag:"img"}})],1)])}),[],!1,null,null,null);o.a=component.exports},429:function(t,o,e){"use strict";e.r(o);var n={components:{MyHeader:e(383).a},data:function(){return{mapConfig:e(381)}}},l=e(35),component=Object(l.a)(n,(function(){var t=this,o=t._self._c;return o("div",{staticClass:"layout-map"},[o("div",{staticClass:"layout-map-inner"},[o("main",{staticClass:"main col-12_md-9_xl-6"},[o("div",{staticClass:"main-sheet"},[o("my-header",{ref:"myHeader",attrs:{mapConfig:t.mapConfig,showToTop:""}}),o("h1",[t._v("このサイトについて")]),o("p"),t._v("このサイトは、能登半島地震で被災された方が受けられる住まいの支援のうち、みなし仮設（賃貸型応急）住宅の対象物件を、地図上で検索する機能を備えています。\n一般社団法人コード・フォー・ジャパン（以下Code for Japan） が、石川県との連携協定の一環で提供しています。"),o("p"),t._v("物件情報は、石川県より直接提供されたものを表示しています。"),o("p"),t._v("物件に関するお問い合わは、物件情報にある連絡先に直接お問い合わせください。\nまた、このサイトは、地図上で物件を検索するための機能を提供しているだけであり、Code for Japan では物件の内容についての保証はいたしません。\n制度そのものや、被災支援については、石川県のホームページなどからお問い合わせください。"),t._m(0),o("footer",{staticClass:"footer"},[o("div",{staticClass:"footer-logo"},[o("img",{attrs:{src:e(380),width:"895",height:"160",alt:t.$t("common.title")}})])])],1)])])])}),[function(){var t=this._self._c;return t("p",[t("a",{attrs:{href:"https://www.pref.ishikawa.lg.jp/kenju/saigai_portal.html",target:"_blank",rel:"noopener noreferrer"}},[this._v("石川県のホームページ")])])}],!1,null,null,null);o.default=component.exports}}]);