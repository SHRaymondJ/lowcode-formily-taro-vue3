import { computed, defineComponent, shallowRef } from 'vue'
import { createForm, Form as IForm } from '@formily/core'
import { connect, createSchemaField, mapProps } from '@formily/vue'
import { SchemaField } from '@raymond/formily-nutui-taro/src/components/SchemaField'

import { Form, FormLayout } from '@/design/elementcomponents/src'
import { Field, FormPage, Input } from '@/nutuicomponents'

import { myTransformToSchema } from '../common'

export default defineComponent({
  name: 'PreviewWidget',
  props: ['tree'],
  setup(props) {
    const formRef = shallowRef<IForm>(createForm())
    const treeSchemaRef = computed(() => {
      return myTransformToSchema(props.tree)
    })

    return () => {
      const form = formRef.value
      const { form: formProps, schema } = treeSchemaRef.value
      console.log(schema)
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            overflowY: 'auto',
            background: 'var(--dn-composite-panel-tabs-content-bg-color)',
          }}
        >
          <Form previewTextPlaceholder={' '} form={form} {...formProps}>
            <SchemaField schema={schema} />
          </Form>
        </div>
      )
    }
  },
})
