import path from 'path'

import NutUIResolver from '@nutui/nutui-taro/dist/resolver'
import Components from 'unplugin-vue-components/webpack'

const config = {
  projectName: 'taro-vue3',
  date: '2023-11-29',
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375
    }
    return 750
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: true,
      exclude: ['@nutui/icons-vue-taro', '@nutui/nutui-taro']
    }
  },
  cache: {
    enable: true
  },
  sass: {},
  h5: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(
        Components({
          include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
          resolvers: [NutUIResolver({ taro: true })]
        })
      )
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
      pxtransform: {
        enable: false
      }
    },
    devServer: {
      port: 10086,
    },
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@mobile': path.resolve(__dirname, '..', '..', 'mobile', 'src', 'components')
  },
  terser: {
    enable: false
  },
  csso: {
    enable: false
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
