import { TreeNode } from '@/design/core/src'
import { computed } from 'vue'
import { useDesigner } from './useDesigner'
import { useTreeNode } from './useTreeNode'
import { computed as reactiveComputed } from '../shared'

export const useNodeIdProps = (node?: TreeNode) => {
  const targetRef = useTreeNode()
  const designerRef = useDesigner()
  
  return reactiveComputed(() => {
    const nodeIdProps = {
      [designerRef.value.props.nodeIdAttrName]: node
        ? node.id
        : targetRef.value?.id,
    }
    if (!targetRef.value) {
      alert('useNodeIdProps test')
    }
    return nodeIdProps
  })
}
