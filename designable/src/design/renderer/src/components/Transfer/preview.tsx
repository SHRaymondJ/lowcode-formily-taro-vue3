import { Transfer as FormilyTransfer } from '@/design/elementcomponents/src'
import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@/design/core/src'
import { DnFC } from '@/design/prototypes/src'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { VNode } from 'vue'

export const Transfer: DnFC<VNode> =
  composeExport(FormilyTransfer, {
    Resource: createResource({
      icon: 'TransferSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'Transfer',
            'x-decorator': 'FormItem',
            'x-component': 'Transfer',
          },
        },
      ],
    }),
    Behavior: createBehavior({
      name: 'Transfer',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Transfer',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Transfer),
      },
      designerLocales: AllLocales.Transfer,
    }),
  })
