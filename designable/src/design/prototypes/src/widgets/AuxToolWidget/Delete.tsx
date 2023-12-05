import { defineComponent } from 'vue'
import { Button } from '@tarojs/components'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { useOperation, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

const DeleteComponent = defineComponent({
  props: ['node'],
  setup(props) {
    const operationRef = useOperation()
    const prefixRef = usePrefix('aux-copy')
    return () => {
      if (props.node === props.node.root) return null
      return (
        <Button
          class={prefixRef.value}
          onClick={() => {
            operationRef.value.removeNodes([props.node])
          }}
        >
          <IconWidget infer="Remove" />
        </Button>
      )
    }
  }
})
export const Delete = composeExport(DeleteComponent, { displayName: 'Delete' })
