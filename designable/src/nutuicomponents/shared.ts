import { Engine,IResizable, ITranslate,TreeNode  } from '@/design/core/src'

export type ComponentNameMatcher =
  | string
  | string[]
  | ((name: string, node: TreeNode, context?: any) => boolean)

export const matchComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName === name
}

export const matchChildComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (!componentName) return false
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName.indexOf(`${name}.`) > -1
}

export const includesComponent = (
  node: TreeNode,
  names: ComponentNameMatcher[],
  target?: TreeNode
) => {
  return names.some((name) => matchComponent(node, name, target))
}

export const queryNodesByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
): TreeNode[] => {
  if (path?.length === 0) return []
  if (path?.length === 1) {
    if (matchComponent(node, path[0])) {
      return [node]
    }
  }
  const result = matchComponent(node, path[0])
    ? node.children.reduce((buf, child) => {
        return buf.concat(queryNodesByComponentPath(child, path.slice(1)))
      }, [] as any)
    : []
  return result
}

export const findNodeByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
): TreeNode | undefined => {
  if (path?.length === 0) return
  if (path?.length === 1) {
    if (matchComponent(node, path[0])) {
      return node
    }
  }
  if (matchComponent(node, path[0])) {
    for (let i = 0; i < node.children.length; i++) {
      const next = findNodeByComponentPath(node.children[i], path.slice(1))
      if (next) {
        return next
      }
    }
  }
}

export const hasNodeByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
) => !!findNodeByComponentPath(node, path)

export const matchArrayItemsNode = (node: TreeNode) => {
  return (
    node?.parent?.props?.type === 'array' &&
    node?.parent?.children?.[0] === node
  )
}

export const createNodeId = (designer: Engine, id: string) => {
  return {
    [designer.props.nodeIdAttrName!]: id,
  }
}

export const createEnsureTypeItemsNode = (type: string) => (node: TreeNode) => {
  const objectNode = node.children.find(
    (child) => child.props?.['type'] === type
  )
  if (objectNode) {
    return objectNode
  } else {
    const newObjectNode = new TreeNode({
      componentName: 'Field',
      props: {
        type,
      },
    })
    node.prepend(newObjectNode)
    return newObjectNode
  }
}

export const behaviorOfResizeAndtranslate = {
  resizable: {
    width: true,
    height: true,
    end(node, element) {
      const width = Number(
        node.props?.style?.width ?? element.getBoundingClientRect().width
      )
      const height = Number(
        node.props?.style?.height ?? element.getBoundingClientRect().height
      )
      node.props = node.props || {}
      const styleKey = node.props['x-decorator']
        ? 'x-decorator-props'
        : 'x-component-props'
      node.props[styleKey] = node.props[styleKey] || {}
      node.props[styleKey].style = node.props[styleKey].style || {}
      node.props[styleKey].style.width = width + 'px'
      node.props[styleKey].style.height = height + 'px'
    },
  } as IResizable,
  translatable: {
    x: true,
    y: true,
    reset(node) {
      node.props = node.props || {}
      const styleKey = node.props['x-decorator']
        ? 'x-decorator-props'
        : 'x-component-props'
      node.props[styleKey] = node.props[styleKey] || {}
      node.props[styleKey].style = node.props[styleKey].style || {}
      const nodeStyle = node.props[styleKey].style
      if (!nodeStyle.left?.includes('px')) {
        nodeStyle.left = '0px'
      }
      if (!nodeStyle.top?.includes('px')) {
        nodeStyle.top = '0px'
      }
    },
    end(node, diffX, diffY) {
      node.props = node.props || {}
      const styleKey = node.props['x-decorator']
        ? 'x-decorator-props'
        : 'x-component-props'
      node.props[styleKey] = node.props[styleKey] || {}
      node.props[styleKey].style = node.props[styleKey].style || {}
      const nodeStyle = node.props[styleKey].style

      let left = 0
      const theString1 = nodeStyle.left || '0px'
      if (theString1?.includes('px')) {
        left = Number(String(theString1).slice(0, -2))
      }
      nodeStyle.left = left + parseInt(String(diffX)) + 'px'

      let top = 0
      const theString2 = nodeStyle.top || '0px'
      if (theString2?.includes('px')) {
        top = Number(String(theString2).slice(0, -2))
      }

      nodeStyle.top = top + parseInt(String(diffY)) + 'px'
    },
  } as ITranslate,
}
