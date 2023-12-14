import { defineComponent } from 'vue'
import { TreeNode } from '@pind/designable-core'
import { Button } from '@tarojs/components'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

const DeleteComponent = defineComponent({
  props: ['node'],
  setup(props) {
    const prefixRef = usePrefix('aux-copy')
    return () => {
      if (props.node === props.node.root) return null
      return (
        <Button
          class={prefixRef.value}
          onClick={() => {
            TreeNode.remove([props.node])
          }}
        >
          <IconWidget infer="Remove" />
        </Button>
      )
    }
  }
})
export const Delete = composeExport(DeleteComponent, { displayName: 'Delete' })
