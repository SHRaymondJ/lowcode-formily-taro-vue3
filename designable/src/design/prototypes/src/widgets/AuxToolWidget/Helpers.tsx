import { computed, defineComponent, nextTick, ref, unref } from 'vue'
import { reaction } from '@formily/reactive'
import { TreeNode } from '@/design/core/src'
import cls from 'classnames'
import { ElButtonGroup as ButtonGroup } from 'element-plus'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { usePrefix, useViewport } from '../../hooks'
import { useEffect } from '../../shared/useEffect'

import { Copy } from './Copy'
import { Delete } from './Delete'
import { DragHandler } from './DragHandler'
import { Selector } from './Selector'

const HELPER_DEBOUNCE_TIMEOUT = 100

export interface IHelpersProps {
  node: TreeNode
  nodeRect: DOMRect
}
export interface IViewportState {
  viewportWidth?: number
  viewportHeight?: number
  viewportScrollX?: number
  viewportScrollY?: number
  viewportIsScrollTop?: boolean
  viewportIsScrollBottom?: boolean
}

const HelpersComponent = defineComponent({
  name: 'Helpers',
  props: ['node', 'nodeRect'],
  emits: ['click'],
  setup(props, {}) {
    const prefixRef = usePrefix('aux-helpers')
    const viewportRef = useViewport()
    const unmountRef = ref(false)
    const refContainer = ref<HTMLDivElement>()

    const position = ref('top-right')

    useEffect(
      () => {
        let request: NodeJS.Timeout
        const getYInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
          if (nodeRect.top - viewportRef.value.scrollY > helpersRect.height) {
            return 'top'
          } else if (
            viewportRef.value.isScrollTop &&
            nodeRect.height + helpersRect.height > viewportRef.value.height
          ) {
            return 'inner-top'
          } else if (
            nodeRect.bottom >=
              viewportRef.value.scrollY + viewportRef.value.height &&
            nodeRect.height + helpersRect.height > viewportRef.value.height
          ) {
            return 'inner-bottom'
          }

          return 'bottom'
        }

        const getXInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
          const widthDelta = helpersRect.width - nodeRect.width
          if (widthDelta >= 0) {
            if (nodeRect.x < widthDelta) {
              return 'left'
            } else if (nodeRect.right + widthDelta > viewportRef.value.width) {
              return 'right'
            } else {
              return 'center'
            }
          }
          return 'right'
        }

        const update = () => {
          const nodeRect = props.nodeRect
          const ref = refContainer
          const helpersRect = ref.value?.getBoundingClientRect()
          if (!helpersRect || !nodeRect) return
          if (unmountRef.value) return
          position.value =
            getYInViewport(nodeRect, helpersRect) +
            '-' +
            getXInViewport(nodeRect, helpersRect)
        }

        nextTick(() => {
          update()
        })

        return reaction(
          () => [
            viewportRef.value.width,
            viewportRef.value.height,
            viewportRef.value.scrollX,
            viewportRef.value.scrollY,
            viewportRef.value.isScrollBottom,
            viewportRef.value.isScrollTop,
          ],
          () => {
            clearTimeout(request)
            request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT)
          }
        )
      },
      () => [viewportRef.value, props.nodeRect]
    )

    return () => {
      const node = props.node
      const nodeRect = props.nodeRect
      if (!nodeRect || !node) return null

      return (
        <div
          class={cls(prefixRef.value, {
            [unref(position)]: true,
          })}
          ref={refContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div class={cls(prefixRef.value + '-content')}>
            <Selector node={node} />
            {node?.allowClone() === false ? null : <Copy node={node} />}
            {node?.allowDrag() === false ? null : <DragHandler node={node} />}
            {node?.allowDelete() === false ? null : <Delete node={node} />}
          </div>
        </div>
      )
    }
  },
})

export const Helpers = composeExport(HelpersComponent, {
  displayName: 'Helpers',
})
