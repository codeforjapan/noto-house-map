(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{415:function(t,e,r){"use strict";r.r(e),r.d(e,"DEFAULT_ICON_COLOR",(function(){return m})),r.d(e,"default",(function(){return v})),r.d(e,"readCategoryOfFolder",(function(){return y}));var n=r(9),o=r(177),l=r(178),c=(r(26),r(12),r(21),r(30),r(176),r(20),r(35),r(31),r(48),r(174)),d=r(416),m="lightgreen",v=function(){function t(){Object(o.a)(this,t),this.updated=void 0,this.markers=void 0}return Object(l.a)(t,[{key:"parse",value:function(t,data,e,r,n){switch(t){case"kml":var o=(new DOMParser).parseFromString(data,"text/xml");return this.loadKMLData(o,e);case"umal":this.loadUmapJsonData(data);break;case"geojson":var l=JSON.parse(data);return this.loadGeoJSONData(l);case"xlsx":return this.loadXLSJsonData(data,r,n)}}},{key:"addFeatureCollection",value:function(t,e){t.features.forEach((function(t){t.geometry.type}))}},{key:"loadUmapJsonData",value:function(data){data.layers.forEach((function(t){}))}},{key:"loadXLSJsonData",value:function(data,t,e){var r=Date.now().toLocaleString(),n=[];return data.forEach((function(r){var o=Object.prototype.hasOwnProperty.call(r,"Latitude")?r.Latitude:Object.prototype.hasOwnProperty.call(r,"緯度")?r.緯度:void 0,l=Object.prototype.hasOwnProperty.call(r,"Longitude")?r.Longitude:Object.prototype.hasOwnProperty.call(r,"経度")?r.経度:void 0;if(void 0!==o&&void 0!==l){r.name=r[e];var c={type:"Feature",properties:r,geometry:{type:"Point",coordinates:[l,o]}},d="未分類";d=c.properties[t]?c.properties[t]:"未分類",n.push({feature:c,category:d})}})),[n,r]}},{key:"loadGeoJSONData",value:function(data){var t=Date.now().toLocaleString(),e=[];return data.features.forEach((function(t){var r="未分類";t.properties.category&&(r=t.properties.category),e.push({feature:t,category:r})})),[e,t]}},{key:"loadKMLData",value:function(data,t){var e=data.getElementsByTagName("Folder");0===e.length&&(e=data.getElementsByTagName("Document"));var r="";if(void 0!==t&&"regexp"===t.type){var n=data.getElementsByTagName(t.field);if(n.length>0){var text=n[0].innerHTML,o=new RegExp(t.pattern,"iu").exec(text);null!=o&&o.length>1&&(r="("+o[t.index]+")")}}var l=[];return Array.prototype.forEach.call(e,(function(t){var e=y(t,data);if("FeatureCollection"===d.kml(t).type){var r=d.kml(t,{styles:!0});if(r.features.length>0)return r.features.map((function(t){return"Point"===t.geometry.type&&(t.properties["marker-color"]=e.color,l.push({feature:t,category:e.name})),t}))}else{var n=d.kml(t,{styles:!0});n.properties["marker-color"]=e.color,l.push({geojsondata:n,category:e.name})}})),[l,r]}},{key:"inBounds",value:function(t,e){var r=(t[0]-e.getNorthEast().lng)*(t[0]-e.getSouthWest().lng)<0,n=(t[1]-e.getNorthEast().lat)*(t[1]-e.getSouthWest().lat)<0;return r&&n}},{key:"convertCategoryStyle",value:function(t,e){return void 0===e||e.forEach((function(e){if(e.name===t.name)return t.color=e.color,t.bgColor=e.bg_color,t.iconClass=e.icon_class,t.class=e.class,t})),t}},{key:"serializeLatLng",value:function(t){return t.lat+","+t.lng}},{key:"serializeBounds",value:function(t){return this.serializeLatLng(t.getNorthWest())+"-"+this.serializeLatLng(t.getSouthEast())}},{key:"deserializeLatLng",value:function(s){var t=s.split(",",2),e=Object(n.a)(t,2),r=e[0],o=e[1],l=parseFloat(o),d=parseFloat(r);return new c.LngLat(l,d)}},{key:"deserializeBounds",value:function(s){try{var t=this;return new c.LngLatBounds(s.split("-",2).map((function(e){return t.deserializeLatLng(e)})))}catch(t){return}}}]),t}();function y(t,e){var r,n="red";try{r=t.getElementsByTagName("name")[0].textContent||"";var o=t.getElementsByTagName("styleUrl")[0].textContent||"";if(o){var l=e.querySelectorAll(o+" Pair");l.length>0&&Array.prototype.forEach.call(l,(function(t){var r=t.querySelector("key");if(r&&"normal"===r.textContent){var o=t.querySelector("styleUrl").textContent,style=e.querySelector(o);try{var l=style.querySelector("IconStyle color").textContent,a=parseInt("0x"+l.substring(0,2))/255,b=parseInt("0x"+l.substring(2,4)),g=parseInt("0x"+l.substring(4,6)),c=parseInt("0x"+l.substring(6,8));n="rgba(".concat(c,",").concat(g,",").concat(b,",").concat(a,")")}catch(t){n=m}}}))}}catch(e){console.log("#category read error"),console.log(e),console.log(t)}return{name:r,color:n,iconUrl:undefined}}},439:function(t,e,r){"use strict";r.r(e);r(30),r(48),r(41),r(401),r(12);var n,o=r(9),l=r(6),c=(r(58),r(25),r(404),r(406),r(31),r(55),r(59),r(138),r(21),r(26),r(35),r(384),r(385),r(174)),d=r.n(c),m=r(383),v=r(409).crc16,y={props:{mapConfig:{type:Object,required:!0}},data:function(){var t="en";return"ja"===this.$i18n.locale&&(t="ja"),{layers:[],map:null,bounds:null,updated_at:null,previous_hash:"",activeCategory:"",checkedArea:[],isOpenAreaSelect:!1,isOpenList:!1,isDisplayAllCategory:!0,mapStyle:"https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json",legendMark:r(386)("./fukidashi_obj_".concat(t,".svg")),legendActive:r(387)("./active_txt_".concat(t,".svg"))}},computed:{center:function(){return this.mapConfig.center},setLayerSettings:function(t,e,r,n){var o=this.mapConfig;return o.layer_settings[t]={color:e,bg_color:r},n&&(o.layer_settings[t].icon_class=n),this.$emit("update:mapConfig",o),o},inBoundsMarkers:function(){var t=this,e=this.layers.filter((function(e){return e.source.show&&t.checkedArea.includes(e.source.title)})).map((function(t){return t.markers})).flat().filter((function(marker){return!t.bounds||n.inBounds(marker.feature.geometry.coordinates,t.bounds)}));return e},displayMarkersGroupByCategory:function(){return this.inBoundsMarkers.reduce((function(t,e){var r=t.find((function(g){return g.category===e.category}));return r||(r={category:e.category,prop:e.category,markers:[]},t.push(r)),r.markers.push(e),t}),[])},selectArea:{get:function(){return this.checkedArea},set:function(t){this.checkedArea=t}}},mounted:function(){var t=this,e=r(415).default,c=new(0,r(389).default);n=new e;var area=[],d={},y=this;this.mapConfig.sources.forEach((function(source){Object(l.a)(regeneratorRuntime.mark((function e(){var data,r,l,f,C;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return source.show&&area.push(source.title),y.checkedArea=area,y.updated_at=Object(m.a)(new Date),e.next=5,c.load(source);case 5:data=e.sent,console.log(source),r=n.parse(source.type,data,source.updated_search_key,source.categoryColumn,source.nameColumn),l=Object(o.a)(r,2),f=l[0],C=l[1],console.log(f),f.map((function(marker){d[marker.category]=!0})),source.updated_at=C,Object.keys(d).map((function(e){if(!y.mapConfig.layer_settings[e]){var r="#";r+=(parseInt(v(e.substr(0)),16)%32+64).toString(16),r+=(parseInt(v(e.substr(1)),16)%32+64).toString(16),r+=(parseInt(v(e.substr(2)),16)%32+64).toString(16);var n="#";n+=(parseInt(v(e.substr(0)),16)%32+128).toString(16),n+=(parseInt(v(e.substr(1)),16)%32+128).toString(16),n+=(parseInt(v(e.substr(2)),16)%32+128).toString(16),t.$emit("setLayerSettings",{name:e,color:r,bg_color:n})}})),y.layers.push({source:source,markers:f});case 13:case"end":return e.stop()}}),e)})))()}))},methods:{load:function(){var t=window.location.hash.substr(1),e=n.deserializeBounds(t);this.map=this.$refs.map_obj,(void 0!==e||void 0!==(e=n.deserializeBounds(this.mapConfig.default_hash)))&&this.map.map.fitBounds(e,{linear:!1}),this.map.map.on("moveend",this.etmitBounds),this.etmitBounds(),this.map.map.addControl(new d.a.NavigationControl)},etmitBounds:function(){this.bounds=this.map.map.getBounds(),this.setHash(this.bounds),this.$emit("bounds-changed")},setHash:function(t){var s=n.serializeBounds(t),path=location.pathname;s!==this.previous_hash&&window.history.pushState("","",path+"#"+s),this.previous_hash=s},selectCategory:function(t){this.activeCategory=t},clickPrintButton:function(){window.print()},getMarkerCategoryText:function(t,e){void 0===t&&(t="未分類");var r="category."+t,n=this.$i18n.t(r);return n!==r?n:t},getMarkerNameText:function(t,e){var r=t.name;return t.hasOwnProperty("name:"+e)&&(r=t["name:"+e]),r}}},f=r(37),C=Object(f.a)(y,(function(){var t=this,e=t._self._c;return e("div",[e("client-only",[t.layers.length?e("div",[e("div",{staticClass:"map-outer"},[e("MglMap",{ref:"map_obj",attrs:{mapStyle:t.mapStyle,center:t.center,zoom:15,preserveDrawingBuffer:"",sourceId:"basemap",id:"map"},on:{"update:mapStyle":function(e){t.mapStyle=e},"update:map-style":function(e){t.mapStyle=e},load:t.load}},[e("MglGeolocateControl"),t._l(t.inBoundsMarkers,(function(marker,r){var n,o,l,c,d,m,v,y,f;return e("MglMarker",{key:String(r),attrs:{coordinates:marker.feature.geometry.coordinates,anchor:"top-left"}},[e("template",{slot:"marker"},[e("div",{staticClass:"marker"},[e("span",{class:{show:t.isDisplayAllCategory||t.activeCategory===marker.category},style:{background:(null===(n=t.mapConfig.layer_settings[marker.category])||void 0===n?void 0:n.color)||marker.feature.properties["marker-color"]||"red"}},[e("i",{class:[null===(o=t.mapConfig.layer_settings[marker.category])||void 0===o?void 0:o.icon_class,null===(l=t.mapConfig.layer_settings[marker.category])||void 0===l?void 0:l.class],style:{backgroundColor:null===(c=t.mapConfig.layer_settings[marker.category])||void 0===c?void 0:c.color,display:t.mapConfig.layer_settings[marker.category]?"inline":"none"}}),e("b",{staticClass:"number",style:{background:null===(d=t.mapConfig.layer_settings[marker.category])||void 0===d?void 0:d.bg_color}},[t._v(t._s(r+1))])])])]),e("MglPopup",[e("div",[e("div",{staticClass:"popup-type"},[e("i",{class:[null===(m=t.mapConfig.layer_settings[marker.category])||void 0===m?void 0:m.icon_class,null===(v=t.mapConfig.layer_settings[marker.category])||void 0===v?void 0:v.class],style:{backgroundColor:null===(y=t.mapConfig.layer_settings[marker.category])||void 0===y?void 0:y.color}}),e("span",{staticClass:"popup-poi-type"},[t._v(t._s(t.getMarkerCategoryText((null===(f=t.mapConfig.layer_settings[marker.category])||void 0===f?void 0:f.name)||marker.category,t.$i18n.locale)))])]),e("p",{staticClass:"popup-detail"},[e("nuxt-link",{attrs:{to:t.localePath("/detail/".concat(marker.feature.properties["管理番号"]))}},[t._v(t._s(t.$i18n.t("PrintableMap.name"))+" "+t._s(t.getMarkerNameText(marker.feature.properties,t.$i18n.locale)))])],1),e("div",{staticClass:"popup-detail-content"},[e("div",{staticClass:"item"},[t._v("間取り： "+t._s(marker.feature.properties["間取り"]))]),e("div",{staticClass:"item"},[t._v("家賃： "+t._s(marker.feature.properties["家賃（円）"]))]),e("div",{staticClass:"item"},[t._v("ペット "+t._s(marker.feature.properties["ペット 可否"]))]),e("div",{staticClass:"item"},[t._v("駐車料： "+t._s(marker.feature.properties["駐車料"]))])])])])],2)}))],2)],1),e("div",{staticClass:"legend-navi"},[e("div",{staticClass:"area-select",class:{open:t.isOpenAreaSelect}},[e("div",{staticClass:"area-close",on:{click:function(e){t.isOpenAreaSelect=!1}}},[t._v(t._s(t.$t("PrintableMap.close_area_select"))),e("i",{staticClass:"fas fa-arrow-down"})]),e("div",{staticClass:"area-list-outer",class:{open:t.isOpenAreaSelect}},[e("ul",{staticClass:"area-list grid"},t._l(t.mapConfig.sources,(function(source){return e("li",{staticClass:"area-item col-12_xs-6"},[e("label",{staticClass:"area-label"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectArea,expression:"selectArea"}],staticClass:"area-input",attrs:{type:"checkbox"},domProps:{value:source.title,checked:Array.isArray(t.selectArea)?t._i(t.selectArea,source.title)>-1:t.selectArea},on:{change:function(e){var r=t.selectArea,n=e.target,o=!!n.checked;if(Array.isArray(r)){var l=source.title,c=t._i(r,l);n.checked?c<0&&(t.selectArea=r.concat([l])):c>-1&&(t.selectArea=r.slice(0,c).concat(r.slice(c+1)))}else t.selectArea=o}}}),t._v(t._s(source.title)),e("span",[t._v(t._s(source.updated_at))]),source.link?e("a",{attrs:{href:source.link,target:"blank"}},[t._v("["+t._s(t.$t("PrintableMap.back_to_map"))+"]")]):t._e()])])})),0)])]),e("div",{staticClass:"navigation"},[e("div",{staticClass:"navigation-area print-exclude"},[e("div",{staticClass:"legend-navi-icon active"},[e("div",{staticClass:"legend-navi-button print-button",on:{click:function(e){return t.clickPrintButton()}}},[e("span",{staticClass:"fa fa-print",attrs:{alt:t.$t("PrintableMap.print")}})])])]),e("div",{staticClass:"navigation-legend legend-navi-inner print-exclude"},[e("div",{staticClass:"legend-navi-icon"},[e("img",{attrs:{src:t.legendMark,width:"60",height:"60",alt:t.$t("PrintableMap.legend")}})]),e("div",{staticClass:"legend-list-outer"},[e("simplebar",{attrs:{"data-simplebar-auto-hide":"false"}},[e("ul",{staticClass:"legend-list"},t._l(t.mapConfig.layer_settings,(function(r,n){return t.displayMarkersGroupByCategory.some((function(t){return t.category===n}))?e("li",{staticClass:"legend-item"},[e("span",{staticClass:"legend-mark",class:{open:t.isDisplayAllCategory||t.activeCategory===n},style:{backgroundColor:r.color},on:{click:function(e){t.selectCategory(n),t.isOpenList=n,t.isDisplayAllCategory=!1}}},[e("i",{class:[r.icon_class]})])]):t._e()})),0)])],1),e("div",{staticClass:"legend-navi-icon",class:{active:t.activeCategory},on:{click:function(e){t.selectCategory(""),t.isDisplayAllCategory=!0,t.isOpenList=!0}}},[e("div",{staticClass:"legend-navi-button"},[e("img",{staticClass:"legend-navi-img",attrs:{src:t.legendActive,width:"40",height:"40",alt:t.$t("PrintableMap.show_all")}})])])])]),e("div",{staticClass:"list-outer",class:{open:t.isOpenList}},[t._l(t.displayMarkersGroupByCategory,(function(r){var n,o,l,c;return e("section",{staticClass:"list-section",class:{show:t.isDisplayAllCategory||t.activeCategory===t.getMarkerCategoryText(r.category,t.$i18n.locale)}},[e("h2",{staticClass:"list-title",style:{backgroundColor:(null===(n=t.mapConfig.layer_settings[r.category])||void 0===n?void 0:n.color)||(null===(o=r.markers[0])||void 0===o||null===(o=o.feature)||void 0===o?void 0:o.properties["marker-color"])||"darkgreen"}},[e("span",{staticClass:"list-title-mark"},[e("i",{class:null===(l=t.mapConfig.layer_settings[r.category])||void 0===l?void 0:l.icon_class})]),e("span",[t._v(t._s(t.getMarkerCategoryText((null===(c=t.mapConfig.layer_settings[r.category])||void 0===c?void 0:c.name)||r.category,t.$i18n.locale)))])]),e("ul",{staticClass:"list-items"},[e("li",{staticClass:"list-item-header grid-noGutter"},[e("div",{staticClass:"col-1"},[e("div",{staticClass:"span"},[t._v("No.")])]),e("div",{staticClass:"col-3"},[e("div",{staticClass:"span"},[t._v("物件名")])]),e("div",{staticClass:"col-2"},[e("div",{staticClass:"span"},[t._v("間取り")])]),e("div",{staticClass:"col-2"},[e("div",{staticClass:"span"},[t._v("家賃")])]),e("div",{staticClass:"col-2"},[e("div",{staticClass:"span"},[t._v("ペット")])]),e("div",{staticClass:"col-2"},[e("div",{staticClass:"span"},[t._v("駐車料")])])]),t._l(r.markers,(function(marker,r){return e("li",{staticClass:"list-item grid-noGutter",class:{oddlist:r%2==0}},[e("div",{staticClass:"col-1"},[e("span",{staticClass:"item-number"},[t._v(t._s(t.inBoundsMarkers.indexOf(marker)+1))])]),e("div",{staticClass:"col-3"},[e("nuxt-link",{attrs:{to:t.localePath("/detail/".concat(marker.feature.properties["管理番号"]))}},[e("span",{staticClass:"item-name"},[t._v(t._s(t.getMarkerNameText(marker.feature.properties,t.$i18n.locale)))])])],1),e("div",{staticClass:"col-2"},[e("span",{staticClass:"item-price"},[t._v(t._s(marker.feature.properties["間取り"]))])]),e("div",{staticClass:"col-2"},[e("span",{staticClass:"item-price"},[t._v(t._s(marker.feature.properties["家賃（円）"]))])]),e("div",{staticClass:"col-2"},[e("span",{staticClass:"item-pet"},[t._v(t._s(marker.feature.properties["ペット 可否"]))])]),e("div",{staticClass:"col-2"},[e("span",{staticClass:"item-parking"},[t._v(t._s(marker.feature.properties["駐車料"]))])])])}))],2)])})),t.isDisplayAllCategory&&0===t.displayMarkersGroupByCategory.length?e("div",{staticClass:"list-section-none"},[e("p",[t._v(t._s(t.$t("PrintableMap.no_point_in_map")))])]):t._e()],2)]),e("div",{staticClass:"legend-close print-exclude",class:{open:t.isOpenList},on:{click:function(e){t.isOpenList=!1}}},[t._v(t._s(t.$t("PrintableMap.close_list"))),e("i",{staticClass:"fas fa-arrow-down"})])]):t._e()])],1)}),[],!1,null,null,null).exports,h=r(399),_=r(400);r(398).init();var k={components:{PrintableMap:C,Modal:_.a,MyHeader:h.a},asyncData:function(t){var e=t.app.i18n.locale;return{updated_at:Object(m.a)(new Date,e)}},data:function(){return{mapConfig:r(381),locale:null,isOpenExplain:!1,fullURL:null,updated_at:null}},head:function(){var title,t,image=this.mapConfig.map_image?this.mapConfig.map_image:"logo.png";if("ja"===this.$i18n.locale)title=this.mapConfig.map_title,t=this.mapConfig.map_description;else title=this.mapConfig.map_title_en,t=this.mapConfig.map_description_en;return{title:title+" - "+this.$i18n.t("common.site_name"),meta:[{hid:"description",name:"description",content:t},{hid:"og:image",property:"og:image",content:"https://kamimap.com/images/"+image},{hid:"og:description",name:"og:description",content:t},{hid:"og:title",name:"og:title",content:title+this.$i18n.t("common.site_name")}]}},methods:{updateQRCode:function(){this.$refs.myHeader.updateQRCode()},closeModalMethod:function(){this.isOpenExplain=!1}}},w=Object(f.a)(k,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout-map"},[e("div",{staticClass:"layout-map-inner"},[e("main",{staticClass:"main col-12_md-9_xl-6"},[e("div",{staticClass:"main-sheet"},[e("my-header",{ref:"myHeader",attrs:{mapConfig:t.mapConfig}}),t.mapConfig?e("printable-map",{attrs:{mapConfig:t.mapConfig},on:{"bounds-changed":t.updateQRCode}}):t._e(),e("footer",{staticClass:"footer"},[e("div",{staticClass:"footer-logo"},[e("img",{attrs:{src:r(382),width:"895",height:"160",alt:t.$t("common.title")}})])])],1)])]),e("modal",{attrs:{isOpen:t.isOpenExplain},on:{closeModal:t.closeModalMethod}})],1)}),[],!1,null,null,null);e.default=w.exports}}]);