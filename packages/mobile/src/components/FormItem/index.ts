import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'

import BaseFormItem from '../../ui/form-item'

/** Field props */
export const FormItem = connect(
  BaseFormItem,
  mapProps({
    decoratorProps: 'decoratorProps',
    decorator: 'decorator',
    component: 'component',
    componentProps: 'componentProps',
    validateStatus: true,
    title: 'label',
    required: true
  })
)

export default FormItem
