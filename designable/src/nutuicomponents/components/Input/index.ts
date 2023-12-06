import { createBehavior, createResource } from '@pind/designable-core'
import { merge } from '@formily/shared'
import { Input as FormilyInput } from '@kimeng/formily-nutui-taro/src/components'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import { DnFC } from '@/design/prototypes/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Input: DnFC<any> = composeExport(FormilyInput, {
  Behavior: createBehavior(
    {
      name: 'Input',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Input',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Input)
      },
      designerLocales: AllLocales.Input
    },
    {
      name: 'Input.TextArea',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Input.TextArea',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Input.TextArea)
      },
      designerLocales: merge(AllLocales.Input, {
        'zh-CN': {
          title: '多行输入'
        },
        'en-US': {
          title: 'TextArea'
        }
      })
    }
  ),
  Resource: createResource(
    {
      icon: 'InputSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            'type': 'string',
            'title': 'Input',
            'x-decorator': 'FormItem',
            'x-component': 'Input'
          }
        }
      ]
    },
    {
      icon: 'TextAreaSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            'type': 'string',
            'title': 'TextArea',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea'
          }
        }
      ]
    }
  )
})
