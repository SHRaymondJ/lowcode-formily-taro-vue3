import type { SetupContext } from 'vue'
import { Component, defineComponent, VNode } from 'vue'
import { Form as FormType, IFormFeedback } from '@formily/core'
import { ExpressionScope,FormProvider as _FormProvider, h, useForm } from '@formily/vue'
import { Button, View } from '@tarojs/components'

import { PreviewText } from '../preview-text'

const FormProvider = _FormProvider as unknown as Component

export interface FormProps {
  form?: FormType
  previewTextPlaceholder: string | (() => VNode)
  className?: string
  style?
}

export const FormPage = defineComponent({
  name: 'FFormPage',
  props: ['form', 'previewTextPlaceholder', 'className', 'style'],
  setup(props: FormProps, { attrs, slots }: SetupContext) {
    const top = useForm()

    return () => {
      const { form, previewTextPlaceholder = slots?.previewTextPlaceholder } = props

      const renderContent = (form: FormType) => {
        return h(
          PreviewText.Placeholder,
          {
            value: previewTextPlaceholder
          },
          {
            default: () => [h(View, { attrs }, slots)]
          }
        )
      }

      if (form) {
        return h(
          FormProvider,
          { form },
          {
            default: () => renderContent(form)
          }
        )
      }

      if (!top.value) throw new Error('must pass form instance by createForm')

      return renderContent(top.value)
    }
  }
})

export default FormPage
