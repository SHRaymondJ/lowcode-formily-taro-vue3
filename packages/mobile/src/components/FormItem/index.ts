import { defineComponent, h } from 'vue'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'
import { Cell } from '@nutui/nutui-taro'

import {
  getStyleNumber,
  pascalCaseToKebabCase,
  resolveComponent,
  stylePrefix
} from '../__builtins__'
// import BaseFormItem from '../../ui/form-item'
import { useFormDeepContext } from '../form-page'
import { useFormLayout } from '../form-layout'
import './index.scss'

const BaseFormItem = defineComponent({
  name: 'FFormItem',
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
    labelAlign: { default: 'center' }
  },
  setup (props, { slots }) {
    const prefixCls = `${stylePrefix}-form-item`
    const deepLayoutRef = useFormLayout()
    return () => {
      const deepLayout = deepLayoutRef.value
      const {
        label,
        colon = deepLayout.colon ?? true,
        layout = deepLayout.layout ?? 'horizontal',
        tooltip,
        labelStyle = {},
        labelWrap = deepLayout.labelWrap ?? false,
        labelWidth = deepLayout.labelWidth,
        wrapperWidth = deepLayout.wrapperWidth,
        labelCol = deepLayout.labelCol,
        wrapperCol = deepLayout.wrapperCol,
        wrapperAlign = deepLayout.wrapperHorizontalAlign ?? 'center',
        wrapperWrap = deepLayout.wrapperWrap,
        wrapperStyle = {},
        fullness = deepLayout.fullness,
        addonBefore,
        addonAfter,
        size = deepLayout.size,
        extra,
        feedbackText,
        feedbackLayout = deepLayout.feedbackLayout ?? 'loose',
        tooltipLayout = deepLayout.tooltipLayout ?? 'icon',
        feedbackStatus,
        feedbackIcon,
        asterisk,
        bordered = deepLayout.bordered,
        inset = deepLayout.inset,
        decorator,
        decoratorProps,
        componentProps,
        component
      } = props as any

      const labelAlign =
        deepLayout.layout === 'vertical'
          ? props.labelAlign ?? deepLayout.labelAlign ?? 'left'
          : props.labelAlign ?? deepLayout.labelAlign ?? 'right'

      console.log('props => ', props)

      // 固定宽度
      let enableCol = false
      if (labelWidth || wrapperWidth) {
        if (labelWidth) {
          labelStyle.width =
            labelWidth === 'auto' ? undefined : getStyleNumber(labelWidth)
          labelStyle.maxWidth =
            labelWidth === 'auto' ? undefined : getStyleNumber(labelWidth)
        }
        if (wrapperWidth) {
          wrapperStyle.width =
            wrapperWidth === 'auto' ? undefined : getStyleNumber(wrapperWidth)
          wrapperStyle.maxWidth =
            wrapperWidth === 'auto' ? undefined : getStyleNumber(wrapperWidth)
        }
        // 栅格模式
      } else if (labelCol || wrapperCol) {
        enableCol = true
      }

      const renderLabel = () =>
        h(
          'div',
          {
            class: `${prefixCls}__label label-style`,
            style: {
              ...labelStyle,
              alignItems: pascalCaseToKebabCase(wrapperAlign)
            }
          },
          {
            default: () => [
              asterisk &&
                h(
                  'span',
                  {
                    style: { color: '#fa2c19', marginRight: '4px' }
                  },
                  { default: () => ['*'] }
                ),
              resolveComponent(label),

              colon ? ':' : ''
            ]
          }
        )
      return h(
        'div',
        {
          class: { card: true, [`${stylePrefix}-cell`]: true },
          style: componentProps.decoratorProps?.style || {}
        },
        {
          default: () => [
            renderLabel(),

            h(
              'div',
              { class: `${prefixCls}__body` },
              {
                default: () => [
                  addonBefore &&
                    h(
                      'span',
                      {},
                      { default: () => [resolveComponent(addonBefore)] }
                    ),
                  slots.default?.(),
                  addonAfter &&
                    h(
                      'span',
                      {},
                      { default: () => [resolveComponent(addonAfter)] }
                    )
                ]
              }
            )
          ]
        }
      )
    }
  }
})

/** Field props */
export const FormItem = connect(
  BaseFormItem,
  mapProps(
    {
      decoratorProps: 'decoratorProps',
      decorator: 'decorator',
      component: 'component',
      componentProps: 'componentProps',
      validateStatus: true,
      title: 'label',
      required: true
    },
    (props, field) => {
      if (isVoidField(field)) return props

      if (!field) return props
      let asterisk = false
      if (field.required && field.pattern !== 'readPretty') {
        asterisk = true
      }
      if ('asterisk' in props) {
        asterisk = props.asterisk
      }
      return {
        asterisk
      }
    }
  )
)

export default FormItem
