import { ElCard } from 'element-plus'
import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import type { VueComponent } from '@formily/vue'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@/design/prototypes/src'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { defineComponent } from 'vue'
import { VNode } from 'vue'
import { useStyle } from '@/design/prototypes/src'

export const Card: DnFC<VNode> = composeExport(
  defineComponent({
    props: { title: {} },
    setup(props, { slots }) {
      const style = useStyle()
      return () => {
        return (
          <ElCard {...props} style={style} v-slots={{
            header: () => (
              <span data-content-editable="x-component-props.title">
                {props.title}
              </span>
            )
          }}>
            {slots.default?.()}
          </ElCard>
        )
      }
    },
  }),
  {
    Behavior: createBehavior({
      name: 'Card',
      extends: ['Field'],
      selector: (node) => node.props?.['x-component'] === 'Card',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.Card),
      },
      designerLocales: AllLocales.Card,
    }),
    Resource: createResource({
      icon: 'CardSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Card',
            'x-component-props': {
              title: 'Title',
            },
          },
        },
      ],
    }),
  }
)
