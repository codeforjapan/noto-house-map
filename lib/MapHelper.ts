/// <reference path="../node_modules/@types/geojson/index.d.ts" />
/// <reference path="../@types/config.d.ts" />

import * as MapLibre from 'maplibre-gl';
import * as geoJson from 'geojson';
import * as tj from '@mapbox/togeojson';

export interface Category {
  displayOnLoad?: boolean,
  browsable?: boolean,
  remoteData?: {},
  name: string,
  id?: number,
  color?: string,
  bgColor?: string,
  iconUrl?: string,
  iconClass?: string,
  class?: string
}

export interface Marker {

}
export interface UpdatedSearchKey {
  type:string,
  pattern:string,
  index:number,
  field:string
}

export interface IPrintableMap {
  updated: Date;
  markers: Array<Marker>;
}

export interface IPrintableMapListener {
  POIFiltered(targets: MapLibre.Marker[]): void;
}

export interface Legend {
  color: string;
  name: string;
  class: string;
  iconClass: string;
}

export const DEFAULT_ICON_COLOR: string = "lightgreen";
/**
 * main class of PrintableMap
 */
export default class MapHelper implements IPrintableMap {
  updated: Date;
  markers: Marker[];

  /**
   * constructor
   * @param host host string of application, like codeforjapan.github.io
   * @param divid div id of a map container.
   * @param listener listener class which receives an event after POI is filtered by moving a map.
   */

  parse(type: string, data: any, updated_search_key?:UpdatedSearchKey, categoryColumn?:string, nameColumn?:string): [Array<any>, string] {
    switch (type) {
      case "kml": {
        const parser = new DOMParser();
        const dom = parser.parseFromString(data, 'text/xml');
        return this.loadKMLData(dom, updated_search_key);
      }
      case "umal": {
        this.loadUmapJsonData(data);
        break;
      }
      case "geojson": {
        const json = JSON.parse(data);
        return this.loadGeoJSONData(json);
      }
      case "xlsx": {
        return this.loadXLSJsonData(data, categoryColumn, nameColumn);
      }
    }
  }

  /**
   * Insert Markers from FeatureCollections
   * @param features FeatureCollection data
   * @param category Category
   */
  addFeatureCollection(features: geoJson.FeatureCollection, category: Category): void {
    features.features.forEach((feature: geoJson.Feature) => {
      if (feature.geometry.type === "Point") {
        // this.addMarker(feature, category);
      }
    });
  }

  /**
   * load Json String based on umap file
   * @param umapJsonData umap style geojson string
   */
  loadUmapJsonData(data: any): void {
    // let data = JSON.parse(jsonstring)
    data.layers.forEach((layer) => {
      /* implement this function if you want to use umap;
      const category: Category = layer._umap_options;
      layer.features.forEach((feature) => {
        // this.addMarker(feature, category);
      });
      */
    });
  }

  loadXLSJsonData(data: any, categoryColumn: string, nameColumn: string): [any, string] {
    const updated_at = Date.now().toLocaleString();
    const markers = [];
    data.forEach((record) => {
      // JSONデータからGeoJSONオブジェクトを生成するコードを挿入します。
      // 緯度と経度の列があるかどうかを確認し、それに応じて座標を設定します
      const latitude = Object.prototype.hasOwnProperty.call(record, 'Latitude') ? record.Latitude : Object.prototype.hasOwnProperty.call(record, '緯度') ? record.緯度 : undefined;
      const longitude = Object.prototype.hasOwnProperty.call(record, 'Longitude') ? record.Longitude : Object.prototype.hasOwnProperty.call(record, '経度') ? record.経度 : undefined;
      // if there is no latitude and longitude, skip this record
      if (latitude === undefined || longitude === undefined) {
        return;
      }
      record.name = record[nameColumn]
      const feature = {
        type: "Feature",
        properties: record,
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
      };
      let category = "未分類"
      // カテゴリーが定義されていないエラーに対処するために、カテゴリーを定義します。
      if (feature.properties[categoryColumn]) {
        category = feature.properties[categoryColumn];
      } else {
        category = "未分類"; // カテゴリーが存在しない場合は、デフォルトのカテゴリーを使用します。
      }
      markers.push({feature, category});
    });
    return [markers, updated_at];
  }

  loadGeoJSONData(data: any): [any, string] {
    const updated_at = Date.now().toLocaleString();
    const markers = [];
    data.features.forEach((feature) => {
      let category = "未分類"
      if (feature.properties.category) {
        category = feature.properties.category;
      }
      markers.push({feature, category});
    });
    return [markers, updated_at];
  }

  loadKMLData(data: Document, updated_search_key?:UpdatedSearchKey): [any, string] {
    let folders: HTMLCollection = data.getElementsByTagName('Folder');
    if (folders.length === 0) {
      folders = data.getElementsByTagName('Document');
    }
    let updated_at = "";
    if (updated_search_key !== undefined){
      if (updated_search_key.type === "regexp"){
        const targetElm = data.getElementsByTagName(updated_search_key.field);
        if (targetElm.length > 0){
          const text = targetElm[0].innerHTML;
          const regExp = new RegExp(updated_search_key.pattern, "iu");
          const result = regExp.exec(text);
          if (result != null && result.length > 1){
            updated_at = "(" + result[updated_search_key.index] + ")";
          }
        }
      }
    }
    const markers = [];
    Array.prototype.forEach.call(folders, (folder) => {
      const category = readCategoryOfFolder(folder, data);

      if (tj.kml(folder).type === "FeatureCollection") {
        const geojsondata: geoJson.FeatureCollection = tj.kml(folder, {styles: true});
        if (geojsondata.features.length > 0) {
          // that.addFeatureCollection(geojsondata, category);
          const result = geojsondata.features.map((feature: geoJson.Feature) => {
            if (feature.geometry.type === "Point") {
              feature.properties['marker-color'] = category.color;
              markers.push({feature, category: category.name});
            }
            return feature;
          });
          return result;
        }
      } else {
        const geojsondata: geoJson.Feature = tj.kml(folder, {styles: true});
        geojsondata.properties['marker-color'] = category.color;
        markers.push({geojsondata, category: category.name});
      }
    });
    return [markers, updated_at];
  }

  inBounds(point: any, bounds: MapLibre.LngLatBounds) {
    const lng = (point[0] - bounds.getNorthEast().lng) * (point[0] - bounds.getSouthWest().lng) < 0;
    const lat = (point[1] - bounds.getNorthEast().lat) * (point[1] - bounds.getSouthWest().lat) < 0;
    return lng && lat;
  }

  convertCategoryStyle(category: Category, layer_settings): Category {
    if (layer_settings === undefined) {
      return category;
    }
    // eslint-disable-next-line no-undef
    layer_settings.forEach((setting: MapPrint.LayerSetting) => {
      // if the category name is found, update with layer setting
      if (setting.name === category.name) {
        category.color = setting.color;
        category.bgColor = setting.bg_color;
        category.iconClass = setting.icon_class;
        category.class = setting.class;
        // category.iconClass = setting.icon_class;
        return category;
      }
    });
    return category;
  }

  serializeLatLng(latLng) {
    return '' + latLng.lat + ',' + latLng.lng;
  }

  serializeBounds(bounds) {
    return this.serializeLatLng(bounds.getNorthWest()) + '-' +
        this.serializeLatLng(bounds.getSouthEast());
  }

  deserializeLatLng(s:string) {
    const [slat, slng] = s.split(',', 2);
    const lng = parseFloat(slng);
    const lat = parseFloat(slat);
    return new MapLibre.LngLat(lng, lat);
  }

  deserializeBounds(s) {
    try {
      const _this = this;
      return new MapLibre.LngLatBounds(s.split('-', 2).map(function(d) {return _this.deserializeLatLng(d);}));
    } catch (e){
      return undefined;
    }
  }
}

/**
 * return Category object
 * @param folder
 * @param document
 */

export function readCategoryOfFolder(folder:Element, document:Document):Category{
  let name;
  let color:string = "red";
  let iconUrl;
  try {
    name = folder.getElementsByTagName("name")[0].textContent || "";
    const styleUrl:string = folder.getElementsByTagName("styleUrl")[0].textContent || "";
    if (styleUrl){
      const styles:NodeList = document.querySelectorAll(styleUrl + " Pair");
      if (styles.length > 0) {
        Array.prototype.forEach.call(styles, (elem) => {
          const key = elem.querySelector("key");
          if (key && key.textContent === "normal"){
            const styleUrl = elem.querySelector("styleUrl").textContent;
            const style = document.querySelector(styleUrl);
            try {
              const c: String = style.querySelector("IconStyle color").textContent;
              const a = parseInt('0x'+c.substring(0, 2)) / 255
              const b = parseInt('0x'+c.substring(2, 4))
              const g = parseInt('0x'+c.substring(4, 6))
              const r = parseInt('0x'+c.substring(6, 8))
              color = `rgba(${r},${g},${b},${a})`
            } catch (e){
              color = DEFAULT_ICON_COLOR;
            }
            // iconUrl = style.querySelector("IconStyle Icon href").textContent;
          }
        });
      }
    }
  } catch (e){
    console.log("#category read error");
    console.log(e);
    console.log(folder);
  }
  return {name, color, iconUrl};

}

/**
 * group by markers by coordinates
 * @param data 
 * @returns 
 */
export function groupByCoordinates(data: any): any {
  const grouped = {};

  data.forEach((item) => {
    const coordinates = item.feature.geometry.coordinates.join(','); // Use coordinates as a string key
    const roomProperties = { 
      "管理番号": item.feature.properties["管理番号"],
      "階数": item.feature.properties["階数"],
      "部屋番号": item.feature.properties["部屋番号"],
      "家賃": item.feature.properties["家賃（円）"],
      "間取り": item.feature.properties["間取り"],
      "ペット 可否": item.feature.properties["ペット 可否"],
      "駐車料": item.feature.properties["駐車料（円）"]
    };

    if (!grouped[coordinates]) {
      // Deep copy item to avoid mutating the original data
      const newItem = JSON.parse(JSON.stringify(item));

      // Initialize rooms with the current room number
      newItem.feature.properties.rooms = [roomProperties];

      // Remove the now unnecessary "部屋番号" property
      delete newItem.feature.properties["管理番号"];
      delete newItem.feature.properties["階数"];
      delete newItem.feature.properties["部屋番号"];
      delete newItem.feature.properties["家賃（円）"];
      delete newItem.feature.properties["間取り"];
      delete newItem.feature.properties["ペット 可否"];
      delete newItem.feature.properties["駐車料（円）"];

      grouped[coordinates] = newItem;
    } else {
      // Just push the new room number into the existing entry
      grouped[coordinates].feature.properties.rooms.push(roomProperties);
    }
  });

  return Object.values(grouped);
};