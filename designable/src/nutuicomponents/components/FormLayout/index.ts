import { createBehavior, createResource } from '@pind/designable-core'
import { merge } from '@formily/shared'
import { FormLayout as FormilyFormLayout } from '@raymond/formily-nutui-taro/src/components'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import { DnFC } from '@/design/prototypes/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const FormLayout: DnFC<any> = composeExport(FormilyFormLayout, {
  Behavior: createBehavior({
    name: 'FormLayout',
    extends: ['Field'],
    selector: node => node.props?.['x-component'] === 'FormLayout',
    designerProps (node) {
      return {
        draggable: !node.isRoot,
        cloneable: !node.isRoot,
        deletable: !node.isRoot,
        droppable: true,
        propsSchema: createFieldSchema(AllSchemas.FormLayout)
      }
    },
    designerLocales: AllLocales.FormLayout
  }),
  Resource: createResource({
    title: 'FormLayout',
    icon: 'FormLayoutSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'object',
          'x-component': 'FormLayout'
        }
      }
    ]
  })
})
