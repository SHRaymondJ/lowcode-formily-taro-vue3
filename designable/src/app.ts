import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import WidgetsInstaller from '@/design/widgets'

import './app.scss'
import 'element-plus/theme-chalk/src/index.scss'
import '@nutui/nutui-taro/dist/style.css'
import './styles.less'

const app = createApp({
  onShow(options) {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

app.use(ElementPlus, { locale: zhCn })
app.use(WidgetsInstaller)
app.config.warnHandler = function (msg, vm, trace) {
  if (msg.startsWith('Invalid prop')) return
  return console.warn(msg, vm, trace)
}

export default app
