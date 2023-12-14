import { CSSProperties, defineComponent } from 'vue'
import { observer } from '@formily/reactive-vue'
import { ClosestPosition } from '@pind/designable-core'
import { isNum } from '@pind/designable-shared'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { useMoveHelper, usePrefix } from '../../hooks'

export interface IInsertionProps {
  workspaceId?: string
}

const InsertionComponent = defineComponent({
  props: ['workspaceId'],
  setup(props) {
    const moveHelper = useMoveHelper(props.workspaceId)
    const prefixRef = usePrefix('outline-tree-insertion')
    return () => {
      const prefix = prefixRef.value
      const createInsertionStyle = (): CSSProperties => {
        const closestDirection = moveHelper.value.outlineClosestDirection
        const closestRect = moveHelper.value.outlineClosestOffsetRect
        const baseStyle: CSSProperties = {
          position: 'absolute',
          transform: 'perspective(1px) translate3d(0,0,0)',
          top: 0,
          left: 0,
        }
        if (!closestRect) return baseStyle
        if (
          closestDirection === ClosestPosition.After ||
          closestDirection === ClosestPosition.InnerAfter ||
          closestDirection === ClosestPosition.Under ||
          closestDirection === ClosestPosition.ForbidAfter ||
          closestDirection === ClosestPosition.ForbidInnerAfter ||
          closestDirection === ClosestPosition.ForbidUnder
        ) {
          baseStyle.width = closestRect.width
          baseStyle.height = 2
          baseStyle.transform = `perspective(1px) translate3d(${
            closestRect.x
          }px,${closestRect.y + closestRect.height - 2}px,0)`
        } else if (
          closestDirection === ClosestPosition.Before ||
          closestDirection === ClosestPosition.InnerBefore ||
          closestDirection === ClosestPosition.Upper ||
          closestDirection === ClosestPosition.ForbidBefore ||
          closestDirection === ClosestPosition.ForbidInnerBefore ||
          closestDirection === ClosestPosition.ForbidUpper
        ) {
          baseStyle.width = closestRect.width
          baseStyle.height = 2
          baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`
        }
        if (closestDirection?.includes('FORBID')) {
          baseStyle.backgroundColor = 'red'
        } else {
          baseStyle.backgroundColor = ''
        }
        Object.keys(baseStyle).forEach((key) => {
          const value = baseStyle[key]
          isNum(value) && (baseStyle[key] = value + 'px')
        })
        return baseStyle
      }
      if (!moveHelper.value?.closestNode) return null

      return <div class={prefix} style={createInsertionStyle()}></div>
    }
  },
})

export const Insertion = composeExport(observer(InsertionComponent), {
  displayName: 'Insertion',
})
