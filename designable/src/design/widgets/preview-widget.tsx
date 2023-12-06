import { transformToSchema } from '@pind/designable-formily-transformer'
import { createForm, Form as IForm } from '@formily/core'
import { Form, FormLayout } from '@/design/elementcomponents/src'
import * as ElementUI from '@/design/elementcomponents/src'
import { connect, createSchemaField, mapProps } from '@formily/vue'
import { shallowRef, defineComponent, computed } from 'vue'
import { Card, Text, Rate, Slider, TreeSelect } from '@/design/renderer/src'

const { SchemaField } = createSchemaField({
  components: {

  },
})

export default defineComponent({
  name: 'PreviewWidget',
  props: ['tree'],
  setup(props) {
    const formRef = shallowRef<IForm>(createForm())
    const treeSchemaRef = computed(() => {
      return transformToSchema(props.tree)
    })

    return () => {
      const form = formRef.value
      const { form: formProps, schema } = treeSchemaRef.value
      console.log(schema)
      return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto', background: 'var(--dn-composite-panel-tabs-content-bg-color)' }}>
          <Form previewTextPlaceholder={" "} form={form} {...formProps}>
            <SchemaField schema={schema} />
          </Form>
        </div>
      )
    }
  },
})
