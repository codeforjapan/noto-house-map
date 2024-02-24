<template lang="pug">
.item-detail(v-if="item")
  h1 {{ item['住宅名'] }} 
    span(v-if="item['部屋番号']")
    span(v-if="item['階数']") {{ item['階数'] }} 階
    span(v-if="item['部屋番号']") , 部屋番号：{{ item['部屋番号'] }}
  .grid_Gutter
    .col
      .col
        h2 家賃 {{item['家賃（円）']}} 円
        .prices 共益費 {{item['共益費（円）']}} 円/ 管理費 {{item['管理費（円）']}}円
        .prices 退去修繕負担金 {{item['退去修繕 負担金（円）']}}円/
          |	礼金 {{item['礼金（円）']}}円/ 仲介手数料 {{item['仲介手数料（円）']}}円
      .col.grid_noGutter.withBorder
        .col-2.title 所在地
        .col 〒 {{ item['郵便番号'] }}
          | {{ item['所在地'] }}
      .col.grid_noGutter.withBorder
        .col.grid
          .col.title 間取り
          .col {{ item['間取り'] }}
        .col.grid
          .col.title 建築年
          .col {{ item['建築年 建築年数'] }}年
      .col.grid_noGutter.withBorder
        .col.grid
          .col.title ペット可否
          .col {{ item['ペット 可否'] }}
        .col.grid
          .col.title 駐車料
          .col {{ item['駐車料'] }}円
      .col.grid_noGutter.withBorder
        .col.grid
          .col-2.title 備考
          .col {{ item['備考（その他情報）'] }}
    .col-3.company
      .col
        h3.title 団体名
        p {{ item['団体名'] }}
      .col
        h3.title 取扱業者
        p {{ item['取扱い業者名'] }}
      .col
        h3.title 問い合わせ先
        p {{ item['問い合わせ先（半角・ハイフンあり）'] }}
      .col
        p 最終更新日時 {{ item['更新日時（yyyymmdd）'] }}
  .text 緯度	経度
</template>
<script lang="js">
import { detectScreenSize } from '~/lib/screenSize.ts';
export default {
  props: {
    mapConfig: {
      type: Object,
      required: true
    },
    itemId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      itemid: this.$props.itemId,
      item: null,
      updated_at: null,
      screenSize: 'xs'
    }
  },
  computed: {
    gridOrCol() {
      // 'xs' サイズの場合は 'col-12' のみを返し、それ以上のサイズではグリッドクラスを追加
      return this.screenSize === 'xs' || this.screenSize === 'sm' ? ['grid'] : ['col'];
    }
  },
  created () {
    const DataLoader = require("~/lib/dataLoader.ts").default;
    const dataloader = new DataLoader();
    const self = this;
    const loadDataAsync = async () => {
      const source = this.mapConfig.sources[0];
      const data = await dataloader.load(source);
      console.log(data);
      self.item = data.find((item) => item['管理番号'] === parseInt(self.itemid));
      console.log(self.item)
    };
    loadDataAsync().catch((error) => {
      console.error(error);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize);
  },
  methods: {
    updateScreenSize() {
      this.screenSize = detectScreenSize(window.innerWidth);
    }
  }
}
</script>