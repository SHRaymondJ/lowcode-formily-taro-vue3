import {
  defineComponent,
  provide,
  InjectionKey,
  Ref,
  inject,
  toRefs,
  ref,
  onBeforeUnmount,
  PropType,
  h,
} from 'vue'
import { FragmentComponent, useField, useFieldSchema } from '@formily/vue'
import { isValid, uid, clone } from '@formily/shared'
import { ArrayField } from '@formily/core'
import type { Schema } from '@formily/json-schema'


import { stylePrefix } from '../__builtins__/configs'
import { composeExport } from '../__builtins__/shared'

export type ArrayBaseMixins = {
  Index?: typeof ArrayBaseIndex
  useArray?: typeof useArray
  useIndex?: typeof useIndex
  useRecord?: typeof useRecord
}

export interface IArrayBaseProps {
  disabled?: boolean
  keyMap?: WeakMap<Record<string, unknown>, string> | string[] | null
}

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export interface IArrayBaseContext {
  field: Ref<ArrayField>
  schema: Ref<Schema>
  props: IArrayBaseProps
  attrs: {
    [key in string]?: any
  }
  keyMap?: WeakMap<Record<string, unknown>, string> | string[] | null
}

const ArrayBaseSymbol: InjectionKey<IArrayBaseContext> =
  Symbol('ArrayBaseContext')
const ItemSymbol: InjectionKey<IArrayBaseItemProps> = Symbol('ItemContext')

const useArray = () => {
  return inject(ArrayBaseSymbol, null)
}

const useIndex = (index?: number) => {
  const { index: indexRef } = toRefs(inject(ItemSymbol) as IArrayBaseItemProps)
  return indexRef ?? ref(index)
}

const useRecord = (record?: number) => {
  const { record: recordRef } = toRefs(
    inject(ItemSymbol) as IArrayBaseItemProps
  )
  return recordRef ?? ref(record)
}

const isObjectValue: (schema: Schema) => boolean = (schema: Schema) => {
  if (Array.isArray(schema?.items)) return isObjectValue(schema.items[0])

  if (schema?.items?.type === 'array' || schema?.items?.type === 'object') {
    return true
  }
  return false
}

const useKey = (schema: Schema) => {
  const isObject = isObjectValue(schema)
  let keyMap: WeakMap<Record<string, unknown>, string> | string[] | null = null

  if (isObject) {
    keyMap = new WeakMap()
  } else {
    keyMap = []
  }

  onBeforeUnmount(() => {
    keyMap = null
  })

  return {
    keyMap,
    getKey: (record: any, index: number) => {
      if (keyMap instanceof WeakMap) {
        if (!keyMap.has(record)) {
          keyMap.set(record, uid())
        }
        return `${keyMap.get(record)}-${index}`
      }

      if (keyMap && !keyMap[index]) {
        keyMap[index] = uid()
      }
      return keyMap ? `${keyMap[index]}-${index}` : undefined
    },
  }
}

const getDefaultValue = (defaultValue: any, schema: Schema): any => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'array') return []
  if (schema?.items?.type === 'boolean') return true
  if (schema?.items?.type === 'date') return ''
  if (schema?.items?.type === 'datetime') return ''
  if (schema?.items?.type === 'number') return 0
  if (schema?.items?.type === 'object') return {}
  if (schema?.items?.type === 'string') return ''
  return null
}

const ArrayBaseInner = defineComponent({
  name: 'ArrayBase',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    keyMap: {
      type: [WeakMap, Array] as PropType<
        WeakMap<Record<string, unknown>, string> | string[]
      >,
    },
  },
  setup(props, { slots, attrs }) {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()

    provide(ArrayBaseSymbol, {
      field,
      schema,
      props,
      attrs,
      keyMap: props.keyMap,
    })
    return () => {
      return h(FragmentComponent, {}, slots)
    }
  },
})

const ArrayBaseItem = defineComponent({
  name: 'ArrayBaseItem',
  props: ['index', 'record'],
  setup(props: IArrayBaseItemProps, { slots }) {
    provide(ItemSymbol, props)
    return () => {
      return h(FragmentComponent, {}, slots)
    }
  },
})

const ArrayBaseIndex = defineComponent({
  name: 'ArrayBaseIndex',
  setup(props, { attrs }) {
    const index = useIndex()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      return h(
        'span',
        {
          class: `${prefixCls}-index`,
          ...attrs,
        },
        {
          default: () => [`#${index.value + 1}.`],
        }
      )
    }
  },
})

export const ArrayBase = composeExport(ArrayBaseInner, {
  Index: ArrayBaseIndex,
  Item: ArrayBaseItem,
  useArray: useArray,
  useIndex: useIndex,
  useKey: useKey,
  useRecord: useRecord,
})
