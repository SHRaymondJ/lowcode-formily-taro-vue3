import { defineComponent, ref } from 'vue'
import { Cell, CellGroup, FormItem as __NutFormItem } from '@nutui/nutui-taro'
import { View as _View } from '@tarojs/components'
import * as _ from 'lodash-es'

import { useFormDeepContext } from '../components'
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
    decorator: {},
    decoratorProps: {},
    componentProps: {},
    component: {},
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
        decorator,
        decoratorProps,
        componentProps,
        component,
      } = props as any

      const formDeepContext = useFormDeepContext()

      console.log('props => ', props)

      return (
        <Cell
          class={`card ${prefixCls}`}
          style={componentProps.decoratorProps?.style || {}}
        >
          <span>
            {asterisk && (
              <span style={{ color: '#fa2c19', marginRight: '4px' }}>*</span>
            )}
            {resolveComponent(label)}
            {colon ? ':' : ''}
          </span>
          {addonBefore && <span>{addonBefore}</span>}
          {slots.default?.()}
          {addonBefore && <span>{addonAfter}</span>}
        </Cell>
      )
    }
  },
})

export default FormItem
