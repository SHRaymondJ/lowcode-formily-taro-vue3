import { TreeSelect as FTreeSelect } from '@/design/elementcomponents/src'
import { createBehavior, createResource } from '@/design/core/src'
import { DnFC } from '@/design/prototypes/src'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import { DefineComponent } from 'vue'

export const TreeSelect: DnFC<DefineComponent<any>> =
  composeExport(FTreeSelect, {
    Behavior: createBehavior({
      name: 'TreeSelect',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'TreeSelect',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.TreeSelect),
      },
      designerLocales: AllLocales.TreeSelect,
    }),
    Resource: createResource({
      icon: 'TreeSelectSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'TreeSelect',
            'x-decorator': 'FormItem',
            'x-component': 'TreeSelect',
          },
        },
      ],
    }),
  })
