import { defineComponent, computed } from 'vue'
import {
  transformToSchema,
  transformToTreeNode,
} from '@pind/designable-formily-transformer'
import _ from 'lodash-es'
import { MonacoInput } from '@/design/settings-form/src'

export default defineComponent({
  name: 'SchemaEditorWidget',
  props: ['tree'],
  emits: ['change'],
  setup(props, { attrs, emit }) {
    const code = computed(() => {
      return JSON.stringify(transformToSchema(props.tree), null, 2)
    })

    return () => {
      return (
        <MonacoInput
          {...attrs}
          value={code.value}
          onChange={(value) => emit('change', transformToTreeNode(JSON.parse(value)))}
          language="json"
          height="100%"
          width="100%"
        />
      )
    }
  },
})
