import { Engine } from '@pind/designable-core'
import { ElMessage } from 'element-plus'
import { myTransformToSchema, myTransformToTreeNode } from '../common'

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(myTransformToSchema(designer.getCurrentTree()))
  )
  ElMessage.success('Save Success')
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    const tree = myTransformToTreeNode(
      // @ts-ignore
      JSON.parse(localStorage.getItem('formily-schema'))
    )
    designer.setCurrentTree(tree)
  } catch (err) {}
}
