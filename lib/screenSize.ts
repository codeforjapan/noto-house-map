// 画面サイズに関する定数と型定義、および画面サイズを検出する関数が定義されています。
// これらはレスポンシブデザインを実装する際に役立ちます。

export const screenSize = {
  xs: 35.5 * 16, // em to px
  sm: 48 * 16, // em to px
  md: 52.625 * 16, // em to px
  lg: 75 * 16, // em to px
  xl: 93 * 16 // em to px
};

export type ScreenSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function detectScreenSize(windowWidth: number): ScreenSizeType {
  if (windowWidth < screenSize.sm) {
    return 'xs';
  } else if (windowWidth >= screenSize.sm && windowWidth < screenSize.md) {
    return 'sm';
  } else if (windowWidth >= screenSize.md && windowWidth < screenSize.lg) {
    return 'md';
  } else if (windowWidth >= screenSize.lg && windowWidth < screenSize.xl) {
    return 'lg';
  } else {
    return 'xl';
  }
}