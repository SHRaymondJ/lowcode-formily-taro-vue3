import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'

import BaseFormItem from '../../ui/form-item'

export const FormItem = connect(
  BaseFormItem,
  mapProps({ validateStatus: true, title: 'label', required: true })
)

export default FormItem
