// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  externals: {
    HotlineClient: 'HotlineClientUi',
  },
  // headScripts: ['https://g.alicdn.com/xspace/phone/0.4.15/sdk.js'],
  scripts: [
    'https://g.alicdn.com/code/lib/react/17.0.0/umd/react.production.min.js',
    'https://g.alicdn.com/code/lib/react-dom/17.0.0/umd/react-dom.production.min.js',
    'https://g.alicdn.com/code/lib/antd/4.14.0/antd.min.js',
    'https://g.alicdn.com/hotline-client/hotline-client-sdk/1.0.0/hotline-client-ui/index.js',
  ],
  links: [
    {href:'https://at.alicdn.com/t/font_1263869_rz6l63j0yrp.css',rel:"stylesheet"},
    {href:'https://g.alicdn.com/code/lib/antd/4.14.0/antd.min.css',rel:"stylesheet"},
    {href:'https://g.alicdn.com/hotline-client/hotline-client-sdk/1.0.0/hotline-client-ui/index.css',rel:"stylesheet"},
  ],
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  openAPI: {
    requestLibPath: "import { request } from 'umi'",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
    schemaPath: join(__dirname, 'oneapi.json'),
    mock: false,
  },
});
