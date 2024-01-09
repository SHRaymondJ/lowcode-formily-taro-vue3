import { createSchemaField } from '@formily/vue'
import { View, Text, Button } from '@tarojs/components'

import { Input, FormItem, FormLayout } from './index'

export const { SchemaField } = createSchemaField({
  components: {
    Text,
    Input,
    FormItem,
    FormLayout
  }
})
