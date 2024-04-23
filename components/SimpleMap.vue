<template lang="pug">
div
  client-only
    .simple-map-outer
      MglMap(:mapStyle.sync="mapStyle"
        :center='center', :zoom='15', @load="load"
        preserveDrawingBuffer=true
        sourceId="basemap", ref="map_obj"
      )#simple-map
        MglGeolocateControl
        MglMarker(
          :coordinates="center"
          anchor="top-left"
        )
    .legend-navi
      .navigation
        a(:href="`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`" target="_blank") Google マップ
        .navigation-area.print-exclude
          .legend-navi-icon.active
            .legend-navi-button.print-button(@click="clickPrintButton()")
              span.fa.fa-print(:alt='$t("PrintableMap.print")')
</template>

<script lang="js">
import "maplibre-gl/dist/maplibre-gl.css";
import "simplebar/dist/simplebar.min.css";
import MapLibre from "maplibre-gl";
export default {
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
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
      isOpenList: false,
      isDisplayAllCategory: true,
      mapStyle: "https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json",
      legendMark: require(`@/assets/images/fukidashi_obj_${locale}.svg`),
      legendActive: require(`@/assets/images/active_txt_${locale}.svg`),
    };
  },
  computed: {
    center() {
      return [this.lng, this.lat]
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
  },
  methods: {
    load() {
      this.map = this.$refs.map_obj;
      this.map.map.addControl(new MapLibre.NavigationControl());
    },
    clickPrintButton() {
      window.print();
    },
  },
};
</script>
