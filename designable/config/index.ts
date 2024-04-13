import { type UserConfigExport,defineConfig } from '@tarojs/cli'
import path from 'node:path'

import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport = {
    projectName: 'taro-vue3',
    date: '2024-1-20',
    designWidth(input) {
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      return 750
    },
    deviceRatio: {
      750: 1,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {
      'process.env.BABEL_TYPES_8_BREAKING': 'false'
    },
    copy: {
      patterns: [],
      options: {},
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
      enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    sass: {},
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      esnextModules: ['nutui-taro', 'icons-vue-taro'],
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
        pxtransform: {
          enable: false,
        },
      },
      devServer: {
        port: 8000,
      },
    },
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
      '@mobile': path.resolve(
        __dirname,
        '..',
        '..',
        'mobile',
        'src',
        'components',
      ),
    },
    terser: {
      enable: false,
    },
    csso: {
      enable: false,
    },
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
