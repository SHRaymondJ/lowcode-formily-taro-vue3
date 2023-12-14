import { getCurrentInstance, Ref, shallowRef } from 'vue'
import { CursorDragType, CursorStatus, TreeNode } from '@pind/designable-core'
import { LayoutObserver, Rect } from '@pind/designable-shared'

import { useEffect } from '../shared/useEffect'

import { useDesigner } from './useDesigner'
import { useViewport } from './useViewport'

const isEqualRect = (rect1: Partial<DOMRect>, rect2: DOMRect | Rect) => {
  return (
    rect1?.x === rect2?.x && rect1?.y === rect2?.y && rect1?.width === rect2?.width && rect1?.height === rect2?.height
  )
}

export const useValidNodeOffsetRect = (nodeRef?: Ref<TreeNode>) => {
  if (!nodeRef) {
    return shallowRef()
  }
  const forceUpdate = getCurrentInstance()!.proxy!.$forceUpdate
  const vm = getCurrentInstance()!
  const engineRef = useDesigner()
  const viewportRef = useViewport()

  const rectRef = shallowRef<DOMRect | Rect | undefined>(viewportRef.value.getValidNodeOffsetRect(nodeRef.value))

  const computeRef = shallowRef()
  useEffect(() => {
    computeRef.value = async () => {
      await Promise.resolve()
      if (!vm.isMounted) return
      const viewport = viewportRef.value
      const engine = engineRef.value
      const node = nodeRef.value
      if (engine.cursor.status !== CursorStatus.Normal && engine.cursor.dragType === CursorDragType.Move) return
      const nextRect = viewport.getValidNodeOffsetRect(node)
      if (nextRect && rectRef.value) {
        if (!isEqualRect(rectRef.value, nextRect)) {
          rectRef.value = nextRect
          forceUpdate()
        }
      }
    }
    computeRef.value()
  }, [viewportRef, nodeRef])

  useEffect(() => {
    const node = nodeRef.value
    const viewport = viewportRef.value
    const element = viewport.findElementById(node?.id)
    const layoutObserver = new LayoutObserver(computeRef.value)
    // if (element && element.isConnected) layoutObserver.observe(element)
    if (element) layoutObserver.observe(element)
    return () => {
      layoutObserver.disconnect()
    }
  }, [nodeRef, viewportRef, engineRef])

  return rectRef
}
