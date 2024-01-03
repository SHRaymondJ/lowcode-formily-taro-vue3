import { computed, defineComponent } from 'vue'
import _ from 'lodash-es'

import { MonacoInput } from '@/design/settings-form/src'

import { myTransformToSchema, myTransformToTreeNode } from '../common'

export default defineComponent({
  name: 'SchemaEditorWidget',
  props: ['tree'],
  emits: ['change'],
  setup(props, { attrs, emit }) {
    const code = computed(() => {
      console.log('props.tree => ', props.tree)
      return JSON.stringify(myTransformToSchema(props.tree), null, 2)
    })

    return () => {
      return (
        <MonacoInput
          {...attrs}
          value={code.value}
          onChange={(value) => {
            const result = myTransformToTreeNode(JSON.parse(value))
            console.log('result => ', result)
            return emit('change', result)
          }}
          language="json"
          height="100%"
          width="100%"
        />
      )
    }
  },
})
