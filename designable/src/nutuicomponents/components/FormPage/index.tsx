import { computed, defineComponent, getCurrentInstance, unref } from 'vue'
import { createBehavior, createResource } from '@pind/designable-core'
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { FormPage as FormPageRaw } from '@kimeng/formily-nutui-taro/src/components'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'
import { DnFC, usePrefix, useStyle } from '@/design/prototypes/src'

import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'

import './styles.less'

const FormPageComponent = observer(
  defineComponent({
    name: 'DnFormPage',
    setup(props, { slots, attrs }) {
      const prefix = usePrefix('designable-form')
      const formRef = computed(() =>
        createForm({
          designable: true
        })
      )
      return () => {
        const form = unref(formRef)

        return (
          <FormPageRaw class={prefix.value} form={form} {...attrs}>
            {slots.default?.()}
          </FormPageRaw>
        )
      }
    }
  })
)

export const FormPage: DnFC<Vue.Component<any, any, any, typeof FormPageRaw>> = composeExport(FormPageComponent, {
  Behavior: createBehavior({
    name: 'FormPage',
    selector: (node) => node.componentName === 'FormPage',
    designerProps(node) {
      return {
        draggable: !node.isRoot,
        cloneable: !node.isRoot,
        deletable: !node.isRoot,
        droppable: true,
        propsSchema: {
          type: 'object',
          properties: {
            ...(AllSchemas.FormLayout.properties as any),
            style: AllSchemas.CSSStyle
          }
        },
        defaultProps: {
          // 带默认值的组件
          labelCol: 6,
          wrapperCol: 24,
          colon: false,
          feedbackLayout: 'loose',
          size: 'default',
          layout: 'horizontal',
          tooltipLayout: 'icon',
          labelAlign: 'right',
          wrapperAlign: 'left',
          shallow: true,
          bordered: true
        }
      }
    },
    designerLocales: AllLocales.FormPage
  }),
  Resource: createResource({
    title: { 'zh-CN': '页面', 'en-US': 'FormPage' },
    icon: 'FormLayoutSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          'type': 'object',
          'x-component': 'FormPage'
        }
      }
    ]
  })
})
