import { computed, defineComponent, h, Ref, toRef } from 'vue'
import { Field } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { isArr, isValid } from '@formily/shared'
import { useField } from '@formily/vue'
import { Button, Text as RawText, View } from '@tarojs/components'

import { stylePrefix } from '../__builtins__/configs'
import { composeExport, createContext, resolveComponent, useContext } from '../__builtins__/shared'

const prefixCls = `${stylePrefix}-preview-text`
const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: Ref<any>) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value?.value) && value?.value !== '' ? value?.value : resolveComponent(placeholderCtx.value) || 'N/A'
  })
  return placeholder
}

const Input = defineComponent({
  name: 'FPreviewTextInput',
  props: ['value'],
  setup(props, { attrs, slots }) {
    const value = toRef(props, 'value')
    const placeholder = usePlaceholder(value)
    return () => {
      return h(
        View,
        {
          class: [prefixCls, 'nut-input', 'nut-input--border'],
          style: attrs.style as any
        },
        {
          // default: () =>
          //   [slots?.prepend?.(), slots?.prefix?.(), placeholder.value, slots?.suffix?.(), slots?.append?.()].filter(
          //     (child) => !!child
          //   )
          default: placeholder.value
        }
      )
    }
  }
})

const Text = defineComponent<any>({
  name: 'FPreviewText',
  setup(_props, { attrs }) {
    const placeholder = usePlaceholder()

    return () => {
      return h(
        View,
        {
          class: [prefixCls],
          style: attrs.style as any
        },
        {
          default: () => placeholder.value
        }
      )
    }
  }
})

export const PreviewText = composeExport(Text, {
  Input,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder
}) as any

export default PreviewText
