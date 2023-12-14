import { Input as FormilyPassword } from '@/design/elementcomponents/src'
import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import { VueComponent, connect, mapProps } from '@formily/vue'
import { createBehavior, createResource } from '@pind/designable-core'
import { DnFC } from '@/design/prototypes/src'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { merge } from '@formily/shared'
import { VNode } from 'vue'

export const Password: DnFC<VNode> =
  composeExport(connect(FormilyPassword, mapProps({}, (args) => ({ ...args, password: true }))), {
    Behavior: createBehavior({
      name: 'Password',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Password',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Input),
      },
      designerLocales: merge(AllLocales.Input, {
        'zh-CN': {
          title: '密码输入',
        },
        'en-US': {
          title: 'PassWord',
        },
      }),
    }),
    Resource: createResource({
      icon: 'PasswordSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'Password',
            'x-decorator': 'FormItem',
            'x-component': 'Password',
          },
        },
      ],
    }),
  })
