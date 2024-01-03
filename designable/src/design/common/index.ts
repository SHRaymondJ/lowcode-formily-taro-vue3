import {
  transformToSchema,
  transformToTreeNode
} from '@pind/designable-formily-transformer'

const customizationTransformOption = { designableFormName: 'FormPage' }

export const myTransformToSchema: typeof transformToSchema = (
  node,
  options
) => {
  return transformToSchema(node, {
    ...customizationTransformOption,
    ...options
  })
}

export const myTransformToTreeNode: typeof transformToTreeNode = (
  formily,
  options
) => {
  return transformToTreeNode(formily, {
    ...customizationTransformOption,
    ...options
  })
}
