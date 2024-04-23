<template lang="pug">
div
  client-only
    div(v-if='layers.length')
      .map-outer
        MglMap(:mapStyle.sync="mapStyle"
          :center='center', :zoom='15', @load="load"
          preserveDrawingBuffer=true
          sourceId="basemap", ref="map_obj"
        )#map
          MglGeolocateControl
          MglMarker(
            v-for="(marker, index) in inBoundsMarkers"
            :key="String(index)"
            :coordinates="marker.feature.geometry.coordinates"
            anchor="top-left"
          )
            template(slot="marker")
              div.marker
                span(
                  :style="{background:mapConfig.layer_settings[marker.category]?.color||marker.feature.properties['marker-color']||'red'}"
                  :class="{show: isDisplayAllCategory || activeCategory === marker.category}"
                )
                  i(
                    :class="[mapConfig.layer_settings[marker.category]?.icon_class, mapConfig.layer_settings[marker.category]?.class]"
                    :style="{backgroundColor:mapConfig.layer_settings[marker.category]?.color, display:mapConfig.layer_settings[marker.category]?'inline':'none'}"
                  )
                  b.number(
                    :style="{background:mapConfig.layer_settings[marker.category]?.bg_color}"
                  ) {{index + 1}}
            MglPopup
              div.popup-window
                div.popup-type
                  i(
                    :class="[mapConfig.layer_settings[marker.category]?.icon_class, mapConfig.layer_settings[marker.category]?.class]"
                    :style="{backgroundColor:mapConfig.layer_settings[marker.category]?.color}"
                  )
                  span.popup-poi-type
                    | {{getMarkerCategoryText(mapConfig.layer_settings[marker.category]?.name||marker.category, $i18n.locale)}}
                p.popup-detail
                  | {{$i18n.t("PrintableMap.name")}} 
                  span(v-if='marker.feature.properties.rooms.length > 1' )
                    | {{getMarkerNameText(marker.feature.properties, $i18n.locale)}}
                  span(v-else)
                    nuxt-link(:to="localePath(`/detail/${marker.feature.properties.rooms[0]['管理番号']}`)")
                      | {{getMarkerNameText(marker.feature.properties, $i18n.locale)}}
                .list-item.grid-noGutter(
                  v-for="(room) in marker.feature.properties.rooms"
                )
                  .col-4
                    nuxt-link(:to="localePath(`/detail/${room['管理番号']}`)")
                      span.item-name {{ room['部屋番号'] === "-" ? "詳細" : room['部屋番号'] }}
                  .col-4
                    span.item-price {{room['間取り']}}
                  .col-4
                    span.item-price {{room['家賃']}}

      .legend-navi
        .area-select(:class='{open: isOpenAreaSelect}')
          .area-close(@click="isOpenAreaSelect=false")
            | {{$t("PrintableMap.close_area_select")}}
            i.fas.fa-arrow-down
          .area-list-outer(:class='{open: isOpenAreaSelect}')
            ul.area-list.grid
              li.area-item.col-12_xs-6(v-for='source in mapConfig.sources')
                label.area-label
                  input.area-input(
                    type='checkbox'
                    :value='source.title'
                    v-model='selectArea'
                  )
                  | {{source.title}}
                  span
                    | {{source.updated_at}}
                  a(
                    v-if='source.link'
                    :href='source.link'
                    target='blank'
                  ) [{{$t("PrintableMap.back_to_map")}}]
        .navigation
          .navigation-legend.legend-navi-inner.print-exclude
            .legend-navi-icon
              img(
                :src='legendMark'
                width="60" height="60"
                :alt='$t("PrintableMap.legend")'
              )
            .legend-list-outer
              simplebar(data-simplebar-auto-hide="false")
                ul.legend-list
                  li.legend-item(
                    v-for='(setting, category) in mapConfig.layer_settings'
                    v-if="displayMarkersGroupByCategory.some((elm) => elm.category === category)"
                  )
                    span.legend-mark(
                      :style="{backgroundColor:setting.color}"
                      @click="selectCategory(category), isOpenList=category, isDisplayAllCategory=false"
                      :class='{open: isDisplayAllCategory || activeCategory === category}'
                    )
                      i(:class="[setting.icon_class]")
            .legend-navi-icon(
              @click="selectCategory(''), isDisplayAllCategory=true, isOpenList=true"
              :class='{active: activeCategory}'
            )
              .legend-navi-button
                img.legend-navi-img(
                  :src='legendActive'
                  width="40" height="40"
                  :alt='$t("PrintableMap.show_all")'
                )
        .list-outer(:class='{open: isOpenList}')
          section.list-section(
            v-for='group in displayMarkersGroupByCategory'
            :class='{show: isDisplayAllCategory || activeCategory === getMarkerCategoryText(group.category, $i18n.locale)}'
          )
            h2.list-title(
              :style="{backgroundColor:mapConfig.layer_settings[group.category]?.color||group.markers[0]?.feature?.properties['marker-color']||'darkgreen'}"
            ) 
              span.list-title-mark
                i(
                  :class="mapConfig.layer_settings[group.category]?.icon_class"
                )
              span {{getMarkerCategoryText(mapConfig.layer_settings[group.category]?.name||group.category, $i18n.locale)}}
            ul.list-items
              li.list-item-header.grid-noGutter
                .col-1
                  .span No.
                .col-3
                  .span 物件名
                .col-2
                  .span 間取り
                .col-2
                  .span 家賃
                .col-2 
                  .span 所在地
              li.list-item.grid-noGutter(
                  :class='{oddlist: index % 2 === 0}'
                  v-for="(marker, index) in group.markers"
                )
                .col-1
                  span.item-number {{findNumbersOfMarker(inBoundsMarkers, marker)}}
                .col-3
                  nuxt-link(:to="localePath(`/detail/${marker.room['管理番号']}`)")
                    span.item-name {{getMarkerNameText(marker.feature.properties, $i18n.locale)}} {{ marker.room['部屋番号'] }}
                .col-2
                  span.item-price {{marker.room['間取り']}}
                .col-2
                  span.item-price {{marker.room['家賃'].toLocaleString()}}円
                .col-2 
                  span.item-pet {{marker.feature.properties['所在地']}}
          .list-section-none(
            v-if="isDisplayAllCategory && displayMarkersGroupByCategory.length === 0"
          )
            p
              | {{$t("PrintableMap.no_point_in_map")}}
      .legend-close.print-exclude(
        :class='{open: isOpenList}'
        @click="isOpenList=false"
      )
        | {{$t("PrintableMap.close_list")}}
        i.fas.fa-arrow-down
</template>

<script lang="js">
import "maplibre-gl/dist/maplibre-gl.css";
import "simplebar/dist/simplebar.min.css";
import MapLibre from "maplibre-gl";
import { getNowYMD } from "~/lib/displayHelper";

const crc16 = require("js-crc").crc16;
let helper;
export default {
  props: {
    mapConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    let locale = "en";
    if (this.$i18n.locale === "ja") {
      locale = "ja";
    }
    return {
      layers: [],
      map: null,
      bounds: null,
      updated_at: null,
      previous_hash: "",
      activeCategory: "",
      checkedArea: [],
      isOpenAreaSelect: false,
      isOpenList: true,
      isDisplayAllCategory: true,
      mapStyle: "https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json",
      legendMark: require(`@/assets/images/fukidashi_obj_${locale}.svg`),
      legendActive: require(`@/assets/images/active_txt_${locale}.svg`),
    };
  },
  computed: {
    center() {
      return this.mapConfig.center;
    },

    setLayerSettings(name, color, bg_color, icon_class) {
      const newConfig = this.mapConfig;
      newConfig.layer_settings[name] = {
        color,
        bg_color
      };
      if (icon_class) {
        newConfig.layer_settings[name].icon_class = icon_class;
    
      }
      this.$emit("update:mapConfig", newConfig);
      return newConfig;
    },
    inBoundsMarkers() {
      const inBoundsMarkers = this.layers
        .filter(l => l.source.show && this.checkedArea.includes(l.source.title))
        .map(l => l.markers).flat()
        .filter((marker) => {
          if (!this.bounds) return true;
          return helper.inBounds(marker.feature.geometry.coordinates, this.bounds);
        });
      return inBoundsMarkers;
    },
    displayMarkersGroupByCategory() {
      const resultGroupBy = this.inBoundsMarkers.reduce((groups, current) => {
        const rooms = current.feature.properties.rooms.map(room => ({
          category: current.category,
          feature: current.feature,
          room
        }))
        rooms.forEach((room) => {
          let group = groups.find((g) => g.category === room.category);
          if (!group) {
            group = {
              category: room.category,
              prop: room.category,
              markers: []
            };
            groups.push(group);
          }
          group.markers.push(room);
        })
        return groups;        
      }, []);
      console.log(resultGroupBy)
      return resultGroupBy;
    },
    selectArea: {
      get() {
        return this.checkedArea;
      },
      set(value) {
        this.checkedArea = value;
      },
    },
  },
  mounted() {
    const MapHelper = require("~/lib/MapHelper.ts").default;
    const groupByCoordinates = require("~/lib/MapHelper.ts").groupByCoordinates;
    const DataLoader = require("~/lib/dataLoader.ts").default;
    const dataloader = new DataLoader();
    helper = new MapHelper();
    const area = [];
    const categories = {};
    const self = this;
    this.mapConfig.sources.forEach((source) => {
      (async () => {
        if (source.show) {
          area.push(source.title);
        }
        self.checkedArea = area;
        self.updated_at = getNowYMD(new Date());
        const data = await dataloader.load(source);
        const [markers, updated_at] = helper.parse(
          source.type,
          data,
          source.updated_search_key,
          source.categoryColumn,
          source.nameColumn,
        );
        // eslint-disable-next-line array-callback-return
        markers.map((marker) => {
          categories[marker.category] = true;
        });
        source.updated_at = updated_at;
        // eslint-disable-next-line array-callback-return
        Object.keys(categories).map((category) => {
          const categoryExists = self.mapConfig.layer_settings[category];

          if (!categoryExists) {
            let color = "#";
            color += ((parseInt(crc16(category.substr(0)), 16) % 32) + 64).toString(16);
            color += ((parseInt(crc16(category.substr(1)), 16) % 32) + 64).toString(16);
            color += ((parseInt(crc16(category.substr(2)), 16) % 32) + 64).toString(16);

            let bg_color = "#";
            bg_color += ((parseInt(crc16(category.substr(0)), 16) % 32) + 128).toString(16);
            bg_color += ((parseInt(crc16(category.substr(1)), 16) % 32) + 128).toString(16);
            bg_color += ((parseInt(crc16(category.substr(2)), 16) % 32) + 128).toString(16);
            this.$emit('setLayerSettings', {
              name: category,
              color,
              bg_color,
            })
          }
        });
        self.layers.push({
          source,
          markers: groupByCoordinates(markers)
        });
      })();
    });
  },
  methods: {
    load() {
      const locationhash = window.location.hash.substr(1);
      let initbounds = helper.deserializeBounds(locationhash);
      this.map = this.$refs.map_obj;
      if (initbounds !== undefined) {
        this.map.map.fitBounds(initbounds, { linear: false });
      } else {
        initbounds = helper.deserializeBounds(this.mapConfig.default_hash);
        if (initbounds !== undefined) {
          this.map.map.fitBounds(initbounds, { linear: false });
        }
      }
      this.map.map.on("moveend", this.etmitBounds);
      this.etmitBounds();
      this.map.map.addControl(new MapLibre.NavigationControl());
    },
    etmitBounds() {
      this.bounds = this.map.map.getBounds();
      this.setHash(this.bounds);
      this.$emit("bounds-changed");
    },
    setHash(bounds) {
      const s = helper.serializeBounds(bounds);
      const path = location.pathname;
      if (s !== this.previous_hash) {
        window.history.pushState("", "", path + "#" + s);
      }
      this.previous_hash = s;
    },
    selectCategory(category) {
      this.activeCategory = category;
    },
    clickPrintButton() {
      window.print();
    },
    getMarkerCategoryText(category, locale) {
      if (category === undefined) {
        category = "未分類";
      }
      const key = "category." + category;
      const categoryText = this.$i18n.t(key);
      if (categoryText !== key) {
        return categoryText;
      } else {
        return category;
      }
    },
    getMarkerNameText(markerProperties, locale) {
      // console.log(markerProperties)
      let name = markerProperties.name;
      // eslint-disable-next-line no-prototype-builtins
      if (markerProperties.hasOwnProperty("name:" + locale)) {
        name = markerProperties["name:" + locale];
      }
      return name;
    },
    findNumbersOfMarker(inBoundsMarkers, marker) {
      for (let i = 0; i < inBoundsMarkers.length; i++) {
        const _marker = inBoundsMarkers[i];
        if (_marker.feature.geometry.coordinates[0] === marker.feature.geometry.coordinates[0] &&
          _marker.feature.geometry.coordinates[1] === marker.feature.geometry.coordinates[1]) {
          return i + 1; // Arrays are 0-indexed; add 1 to match human-readable numbering
        }
      }
      return 0; // Return 0 if not found, though this case should ideally never occur
    },
  },
};
</script>
