/*
 * @Descripttion: 
 * @version: 
 * @Author: Wynters
 * @Date: 2024-05-12 14:13:03
 * @LastEditTime: 2024-05-19 22:47:16
 * @FilePath: \umi-rust-panel\config\config.ts
 */
//郑重声明：本源代码以Apache2.0协议开源不能修改版权信息，否则将保留追究法律责任的权利
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
const AppConfig = {
  app: {
    layout: {
      title: 'RustPanel',//此地方不得进行修改
      logo: '/images/logo.png',
    },
    favicons: ['/favicon.ico'],
    //"browser" | "hash" | "memory"
    history: 'hash',
  },
  /** 国际化插件  https://umijs.org/docs/max/i18n   */
  locale: {
    antd: true, // 如果项目依赖中包含 `antd`，则默认为 true
    baseNavigator: true,
    baseSeparator: '-',
    default: 'zh-CN',
    title: true,
    useLocalStorage: true,
  },

  proxy: {
    development: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' },
      },
    },
    production: {},
  },
};




import { defineConfig } from '@umijs/max';
/* 无法执行 ? */
export function render(oldRender: any) {
  console.log('render');
  setTimeout(() => {
    oldRender();
  }, 8000);
}

export default defineConfig({
  /** Ant Design 配置 */
  antd: {
    appConfig: {},
    theme: {},
  },
   //"browser" | "hash" | "memory"
   history: { type: AppConfig.app.history},

  locale:AppConfig.locale,
  /** 权限配置 */
  access: {},
  /** 数据流 */
  model: {},
  dva: false,
  /** 初始化状态 */
  initialState: {},
  /** 请求配置 */
  request: {},
  layout: {
    title: 'RustPanel',//此地方不得进行修改
    logo: '/images/logo.png',
  },
  /** 约定式路由配置 */
  conventionRoutes: {
    // MARK: 排除不需要生成路由的文件夹，解决约定式路由生成问题，如: login页面不展示全局layout
    exclude: [/\/components\//, /\/models\//, /\/common\//, /\/auth\//],
  },
  // routes,
  npmClient: 'pnpm',
  /** 代理设置 */
  /* proxy: {
    '/admin.php': {
      target: 'http://127.0.0.1:8000/admin.php',
      changeOrigin: true,
      pathRewrite: { '^/admin.php': '' },
    },
    '/api.php': {
      target: 'http://127.0.0.1:8000/api.php',
      changeOrigin: true,
      pathRewrite: { '^/api.php': '' },
    },
  } */

  proxy: AppConfig.proxy[process.env.NODE_ENV],




  plugins: [require.resolve('@umijs/plugins/dist/unocss')],
  unocss: { watch: ['src/**/*.tsx'] },

  /** 第三方统计，百度统计配置*/
  // analytics: { baidu: '' },
  title: 'RustPanel',
  favicons: ['/favicon.ico'],
  // metas: [
  //   {
  //     name: 'keywords',
  //     content:
  //       '安全的服务器可视化面板',
  //   },
  //   {
  //     name: 'description',
  //     content:
  //       '安全的服务器可视化面板',
  //   },
  // ],
  esbuildMinifyIIFE:true,
  chainWebpack(memo) {
    // 代码高亮显示
      memo.plugin('monaco-editor').use(MonacoWebpackPlugin, [
          {
            // 支持高亮显示的代码语言
              languages: ['abap' , 'apex' , 'azcli' , 'bat' , 'cameligo' , 'clojure' , 'coffee' , 'cpp' , 'csharp' , 'csp' , 
              'css' , 'dockerfile' , 'fsharp' , 'go' , 'graphql' , 'handlebars' , 'html' , 'ini' , 'java' , 'javascript' , 
              'json' , 'kotlin' , 'less' , 'lua' , 'markdown' , 'mips' , 'msdax' , 'mysql' , 'objective-c' , 'pascal' , 
              'pascaligo' , 'perl' , 'pgsql' , 'php' , 'postiats' , 'powerquery' , 'powershell' , 'pug' , 'python' , 'r' , 
              'razor' , 'redis' , 'redshift' , 'restructuredtext' , 'ruby' , 'rust' , 'sb' , 'scheme' , 'scss' , 'shell' , 
              'solidity' , 'sophia' , 'sql' , 'st' , 'swift' , 'tcl' , 'twig' , 'typescript' , 'vb' , 'xml' , 'yaml']
          }
      ])
  }
});
