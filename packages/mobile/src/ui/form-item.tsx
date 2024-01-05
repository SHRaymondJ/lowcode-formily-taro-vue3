import { defineComponent } from 'vue'
import { Cell, CellGroup, FormItem as __NutFormItem } from '@nutui/nutui-taro'
import { View as _View } from '@tarojs/components'
import * as _ from 'lodash-es'

import { resolveComponent, stylePrefix } from '../components/__builtins__'

const FormItem = defineComponent({
  name: 'FormItem',
  props: {
    className: {},
    required: {},
    label: {},
    colon: {},
    layout: {},
    tooltip: {},
    labelStyle: {},
    labelAlign: {},
    labelWrap: {},
    labelWidth: {},
    wrapperWidth: {},
    labelCol: {},
    wrapperCol: {},
    wrapperAlign: {},
    wrapperWrap: {},
    wrapperStyle: {},
    fullness: {},
    addonBefore: {},
    addonAfter: {},
    size: {},
    extra: {},
    feedbackText: {},
    feedbackLayout: {},
    tooltipLayout: {},
    feedbackStatus: {},
    feedbackIcon: {},
    asterisk: {},
    gridSpan: {},
    bordered: { default: true },
    inset: { default: false },
  },
  setup(props, { slots }) {
    const prefixCls = `${stylePrefix}-form-item`
    return () => {
      const {
        label,
        colon = true,
        layout = 'horizontal',
        tooltip,
        labelStyle = {},
        labelWrap = false,
        wrapperAlign = 'left',
        wrapperStyle = {},
        addonBefore,
        addonAfter,
        extra,
        feedbackText,
        feedbackLayout = 'loose',
        tooltipLayout = 'icon',
        feedbackStatus,
        feedbackIcon,
        asterisk,
      } = props as any

      return (
        <Cell class="card" style={wrapperStyle}>
          <span>{resolveComponent(label)}</span>
          {slots.default?.()}
        </Cell>
      )
    }
  },
})

export default FormItem
