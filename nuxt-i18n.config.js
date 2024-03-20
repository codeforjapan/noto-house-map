export default {
  locales: [
    {
      code: 'ja',
      iso: 'ja',
      name: '日本語',
      file: 'ja.json'
    }
  ],
  strategy: 'prefix_except_default',
  defaultLocale: 'ja',
  lazy: true,
  loadLanguagesAsync: true,
  langDir: 'locales/'
}
