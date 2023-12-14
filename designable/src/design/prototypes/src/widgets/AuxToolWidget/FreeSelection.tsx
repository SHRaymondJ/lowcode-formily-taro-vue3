import { defineComponent } from 'vue'
import { observer } from '@formily/reactive-vue'
import { CursorDragType, CursorStatus } from '@pind/designable-core'
import { calcRectByStartEndPoint, isNum } from '@pind/designable-shared'
import cls from 'classnames'

import { useCursor, useOperation, usePrefix, useViewport } from '../../hooks'

export const FreeSelection = observer(
  defineComponent({
    name: 'FreeSelection',
    props: [],
    setup() {
      const cursorRef = useCursor()
      const viewportRef = useViewport()
      const prefixRef = usePrefix('aux-free-selection')
      const operationRef = useOperation()

      return () => {
        const cursor = cursorRef.value
        const viewport = viewportRef.value
        const operation = operationRef.value
        const createSelectionStyle = () => {
          const { dragStartPosition, position } = cursor
          if (!dragStartPosition) return {}
          const startDragPoint = viewport.getOffsetPoint({
            x: dragStartPosition.topClientX || 0,
            y: dragStartPosition.topClientY || 0,
          })
          const currentPoint = viewport.getOffsetPoint({
            x: position.topClientX || 0,
            y: position.topClientY || 0,
          })
          const rect = calcRectByStartEndPoint(
            startDragPoint,
            currentPoint,
            viewport.dragScrollXDelta,
            viewport.dragScrollYDelta
          )

          const baseStyle: any = {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.2,
            borderWidth: 1,
            borderStyle: 'solid',
            transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
            height: isNum(rect.height) ? rect.height + 'px' : rect.height,
            width: isNum(rect.width) ? rect.width + 'px' : rect.width,
            pointerEvents: 'none',
            boxSizing: 'border-box',
            zIndex: 1,
          }
          return baseStyle
        }
        console.log('FreeSelection -> ', )
        if (
          operation.moveHelper.hasDragNodes ||
          cursorRef.value.status !== CursorStatus.Dragging ||
          cursor.dragType !== CursorDragType.Move
        )
          return null
        return (
          <div
            class={cls(prefixRef.value)}
            style={createSelectionStyle()}
          ></div>
        )
      }
    },
  })
)
