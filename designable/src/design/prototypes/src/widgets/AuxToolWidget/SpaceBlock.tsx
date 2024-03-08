import { computed, defineComponent } from 'vue'
import { observer } from '@formily/reactive-vue'
import { CursorStatus } from '@/design/core/src'
import {
  calcRectOfAxisLineSegment,
  ILineSegment,
} from '@/design/shared/src'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { useCursor, usePrefix, useTransformHelper } from '../../hooks'

export const SpaceBlockComponent = observer(
  defineComponent({
    name: 'SnapLine',
    setup() {
      const cursor = useCursor()
      const transformHelper = useTransformHelper()
      const prefix = usePrefix('aux-space-block')

      if (cursor.value.status !== CursorStatus.Dragging) return null

      const renderRulerBox = (distance: number, type?: string) => {
        if (type === 'top' || type === 'bottom') {
          return (
            <div class={prefix + '-ruler-v'}>
              <div class={prefix + '-ruler-indicator'}>
                <span>{distance?.toFixed(0)}</span>
              </div>
            </div>
          )
        } else if (type === 'left' || type === 'right') {
          return (
            <div class={prefix + '-ruler-h'}>
              <div class={prefix + '-ruler-indicator'}>
                <span>{distance?.toFixed(0)}</span>
              </div>
            </div>
          )
        }
      }

      const renderDashedLine = (line?: ILineSegment) => {
        if (!line) return null
        const rect = calcRectOfAxisLineSegment(line)
        if (!rect) return null
        const width = rect.width || 2
        const height = rect.height || 2
        return (
          <svg
            width={width + 'px'}
            height={height + 'px'}
            viewBox={`0 0 ${width} ${height}`}
            style={{
              top: 0,
              left: 0,
              transform: `perspective(1px) translate3d(${line.start.x}px,${line.start.y}px,0)`,
              position: 'absolute',
              zIndex: 3,
            }}
          >
            <line
              x1={line.start.x - rect.x}
              y1={line.start.y - rect.y}
              x2={line.end.x - rect.x}
              y2={line.end.y - rect.y}
              stroke-dasharray={4}
              stroke="#745BFF"
              stroke-width={2}
            ></line>
          </svg>
        )
      }

      return (
        <>
          {transformHelper.measurerSpaceBlocks.map(
            ({ type, crossDragNodesRect, distance, extendsLine }, key) => {
              return (
                <>
                  {renderDashedLine(extendsLine)}
                  <div
                    key={key}
                    style={{
                      top: 0,
                      left: 0,
                      height: crossDragNodesRect.height,
                      width: crossDragNodesRect.width,
                      transform: `perspective(1px) translate3d(${crossDragNodesRect.x}px,${crossDragNodesRect.y}px,0)`,
                      position: 'absolute',
                      zIndex: 3,
                    }}
                  >
                    {renderRulerBox(distance, type)}
                  </div>
                </>
              )
            }
          )}
          {transformHelper.thresholdSpaceBlocks.map(({ rect }, key) => {
            return (
              <div
                key={key}
                class={prefix}
                style={{
                  top: 0,
                  left: 0,
                  height: rect.height,
                  width: rect.width,
                  transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
                  position: 'absolute',
                  background: 'rgba(255, 0, 0, 0.2)',
                  zIndex: 1,
                }}
              ></div>
            )
          })}
        </>
      )
    },
  })
)

export const SpaceBlock = composeExport(SpaceBlockComponent, {
  displayName: 'SpaceBlock',
})
