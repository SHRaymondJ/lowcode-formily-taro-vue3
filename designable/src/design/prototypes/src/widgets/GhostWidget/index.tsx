import { defineComponent, onBeforeUnmount, ref, unref } from 'vue'
import { autorun, observe } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { CursorStatus } from '@pind/designable-core'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { useCursor, useDesigner, usePrefix } from '../../hooks'
import { useEffect } from '../../shared/useEffect'
import { NodeTitleWidget } from '../NodeTitleWidget'

import './styles.less'

const GhostWidgetComponent = defineComponent({
  setup() {
    const designerRef = useDesigner()
    const cursorRef = useCursor()
    const refInstance = ref<HTMLDivElement>()
    const prefixRef = usePrefix('ghost')

    useEffect(
      () =>
        autorun(() => {
          const cursor = unref(cursorRef)
          if (!cursor.position) return
          const { topClientX = 0, topClientY = 0 } = cursor.position
          const ref = refInstance.value
          const transform = `perspective(1px) translate3d(${
            topClientX - 18
          }px,${topClientY - 12}px,0) scale(0.8)`
          if (!ref) return
          ref.style.transform = transform
        }),
      [designerRef, cursorRef]
    )

    return () => {
      const designer = unref(designerRef)
      const cursor = unref(cursorRef)

      const movingNodes = designer.findMovingNodes()
      const firstNode = movingNodes[0]

      const renderNodes = () => {
        return (
          <span
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            <NodeTitleWidget node={firstNode} />
            {movingNodes.length > 1 ? '...' : ''}
          </span>
        )
      }

      if (!firstNode) return null

      return cursor.status === CursorStatus.Dragging ? (
        <div class={prefixRef.value} ref={refInstance}>
          {renderNodes()}
        </div>
      ) : null
    }
  },
})

export const GhostWidget = composeExport(observer(GhostWidgetComponent), {
  displayName: 'GhostWidget',
})
