import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'
import { CursorDragType,Engine } from '../models'

export const useTranslateEffect = (engine: Engine) => {
  engine.subscribeTo(DragStartEvent, (event) => {
    const target = event.data.target as HTMLElement
    const currentWorkspace =
      event.context?.workspace ?? engine.workbench.activeWorkspace
    const handler = target?.closest(`*[${engine.props.nodeTranslateAttrName}]`)
    if (!currentWorkspace) return
    const helper = currentWorkspace.operation.transformHelper
    if (handler) {
      const type = handler.getAttribute(
        engine.props.nodeTranslateAttrName as string
      )
      if (type) {
        const selectionElement = handler.closest(
          `*[${engine.props.nodeSelectionIdAttrName}]`
        ) as HTMLElement
        if (selectionElement) {
          const nodeId = selectionElement.getAttribute(
            engine.props.nodeSelectionIdAttrName as string
          )
          if (nodeId) {
            const node = engine.findNodeById(nodeId)
            if (node) {
              node.designerProps.translatable?.reset(node)
              helper.dragStart({ dragNodes: [node], type: 'translate' })
            }
          }
        }
      }
    }
  })
  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Translate) return
    const currentWorkspace =
      event.context?.workspace ?? engine.workbench.activeWorkspace
    const helper = currentWorkspace?.operation.transformHelper
    if (!helper) return
    const dragNodes = helper.dragNodes
    if (!dragNodes.length) return
    helper.dragMove()
    dragNodes.forEach((node) => {
      const element = node.getElement()
      if (!element) return
      helper.translate(node, (translate) => {
        // element.style.position = 'absolute'
        // element.style.left = '0px'
        // element.style.top = '0px'
        element.style.transform = `translate3d(${translate.x}px,${translate.y}px,0)`
      })
    })
  })
  engine.subscribeTo(DragStopEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Translate) return
    const currentWorkspace =
      event.context?.workspace ?? engine.workbench.activeWorkspace
    const helper = currentWorkspace?.operation.transformHelper
    if (helper) {
      const dragNodes = helper.dragNodes
      const { dragStartNodesRect, dragNodesRect } = helper
      helper.dragEnd()
      if (!dragNodes.length) return
      dragNodes.forEach((node) => {
        const element = node.getElement()
        if (!element) return
        element.style.transform = ''
        node.designerProps.translatable?.end?.(
          node,
          dragNodesRect!.x - dragStartNodesRect!.x,
          dragNodesRect!.y - dragStartNodesRect!.y
        )
      })
    }
  })
}
