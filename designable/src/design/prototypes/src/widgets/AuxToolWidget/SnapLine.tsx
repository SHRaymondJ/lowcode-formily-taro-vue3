import { computed, defineComponent } from 'vue'
import { observer } from '@formily/reactive-vue'
import { CursorStatus } from '@/design/core/src'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { useCursor, usePrefix, useTransformHelper } from '../../hooks'

export const SnapLineComponent = observer(
  defineComponent({
    name: 'SnapLine',
    setup() {
      const cursor = useCursor()
      const transformHelper = useTransformHelper()
      const prefix = usePrefix('aux-snap-line')
      const createLineStyle = (rect: DOMRect) => {
        const baseStyle: any = {
          top: 0,
          left: 0,
          height: rect.height || 1,
          width: rect.width || 1,
          transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
          background: `#b0b1f3`,
          position: 'absolute',
          zIndex: 2,
        }
        return baseStyle
      }
      if (cursor.value.status !== CursorStatus.Dragging) return null
      return (
        <>
          {transformHelper.closestSnapLines.map((line, key) => {
            if (line.type !== 'normal') return null
            return (
              <div
                key={key}
                class={prefix}
                style={createLineStyle(line.rect as DOMRect)}
              ></div>
            )
          })}
        </>
      )
    },
  })
)

export const SnapLine = composeExport(SnapLineComponent, {
  displayName: 'Selection',
})
