interface SourceProp {
  id: string;
  url: string;
  link: string;
  type: string;
  title: string;
  show: boolean;
  categoryColumn?: string;
  nameColumn?: string;
}

export default class DataLoader {
  async load(source: SourceProp) {
    try {
      const ky = require("ky").default;
      let response = ""
      if (source.type === "xlsx") {
      // Start Generation Here
        // XLSXが見つからないという問題に対処するために、必要なモジュールをインポートします
        const XLSX = require('xlsx');
        const res = await fetch(source.url);
        if (!res.ok) throw new Error(`リモートのXLSXファイルの取得に失敗しました: ${res.statusText}`);
        // 'buffer' メソッドが 'Response' タイプに存在しないという問題を解決するために、
        // 'arrayBuffer' メソッドを使用してバッファを取得します
        const arrayBuffer = await res.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'buffer', cellDates: true });
        response = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        return response;
      } else {
        response = await ky.get(source.url).text();
      }
      return response;
    } catch (error) {
      console.error("データの読み込み中にエラーが発生しました:", error);
      return null;
    }
  }
}
