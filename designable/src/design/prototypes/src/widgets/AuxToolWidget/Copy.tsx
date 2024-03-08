import { defineComponent } from 'vue'
import { TreeNode } from '@/design/core/src'
import { Button } from '@tarojs/components'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import { useStyle } from '@/design/prototypes/src'

import { useOperation, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

// export interface ICopyProps {
//   node: TreeNode
//   style?: React.CSSProperties
// }

const CopyComponent = defineComponent({
  name: 'CopyComponent',
  props: ['node'],
  setup(props) {
    const prefixRef = usePrefix('aux-copy')
    const style = useStyle()
    return () => {
      if (props.node === props.node.root) return null
      return (
        <Button
          class={prefixRef.value}
          style={style}
          onClick={() => {
            TreeNode.clone([props.node])
          }}
        >
          <IconWidget infer="Clone" />
        </Button>
      )
    }
  }
})

export const Copy = composeExport(CopyComponent, { displayName: 'Copy' })
