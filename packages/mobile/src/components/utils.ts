import { Schema } from '@formily/json-schema'
import { useField } from '@formily/vue'
import { autorun, observable } from '@formily/reactive'
import vm from '@kimeng/vm'
import Taro from '@tarojs/taro'
import * as lodash from 'lodash-es'

import { ArrayBase } from './array-base'

// --- 小工具
// lodash.throttle 在小程序里不能正常获得时间
export function throttle(callback, wait = 600) {
  let start = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - start >= wait) {
      callback.call(this, ...args)
      start = now
    }
  }
}

// --- Schema中JS表达式执行相关
function baseCompiler(expression, scope, isStatement?) {
  if (isStatement) {
    new Function(
      '$root',
      'with($root) { '.concat(expression, '; }')
    )(scope)
    return
  }
  return new Function(
    '$root',
    'with($root) { return ('.concat(expression, '); }')
  )(scope)
}
function myCompiler(expression, scope, isStatement?) {
  if (scope === void 0) {
    scope = {}
  }
  const scopeKey = Object.keys(scope).filter(str => str.includes('$'))
  scopeKey.forEach((key) => {
    const reg = new RegExp(`\\${key}`, 'g')
    expression = expression.replace(reg, 'scope.' + key)
  })
  const bridge = { current: null }
  const context = vm.createContext({ bridge, expression, scope, console })
  try {
    if (isStatement) {
      vm.runInContext(`${expression} `, context)
      return
    }
    vm.runInContext(`bridge.current = ${expression} `, context)
  } catch (err) {
    console.error(err)
  }
  return bridge.current
}
export function formilyCompilerInMiniRegister() {
  // json-schema注册兼容小程序的解析器
  Schema.registerCompiler(myCompiler)
  shared.useMyCompiler = true
}

// --- 事件系统相关
const shared = {
  formilyStore: {
    Taro,
  },
  PC: false,
  useMyCompiler: false,
  getCompiler() {
    return this.useMyCompiler ? myCompiler : baseCompiler
  }
}
type typeScope = Partial<{
  $dependencies
  $deps
  $effect
  $form
  $memo
  $observable
  $props
  $self
  $target
  $values

  // Array组件里才有
  $array
  $index
  $record
}>
export type typeEventItem = {
  api: string
  path: string
  propsOperatorsArray: any[]
}
export function formilyStoreRunFunction(
  scope: typeScope,
  path,
  propsOperatorsArray,
  ...otherProps
) {
  console.log(
    'formilyStoreRunFunction -> formilyStore scope path propsOperatorsArray otherProps -> ',
    shared.formilyStore,
    scope,
    path,
    propsOperatorsArray,
    otherProps
  )
  let fn
  let callObject = null

  // 自定义JS语句执行
  if (path === 'runStatement') {
    const expression = propsOperatorsArray[0]
    if (expression) {
      shared.getCompiler()(expression, scope, true)
    }
    return
  }

  // formily和注册方法执行
  if (path.includes('$form')) {
    // 从$form上获取方法
    const formFnPath = path.split('.')[1]
    fn = lodash.get(scope.$form, formFnPath)
    callObject = scope.$form
  } else {
    // 从全局formilyStore获取方法
    fn = lodash.get(shared.formilyStore, path)
    try {
      const segments = String(path || '').split('.')
      segments.pop()
      callObject = lodash.get(shared.formilyStore, segments.join())
    } catch (err) {
      console.log('formilyStoreRunFunction -> getCallObject err -> ', err)
    }
  }
  let propsArray: any[] = []
  try {
    propsArray = propsOperatorsArray.map((expression) => {
      return shared.getCompiler()(expression, scope)
    })
  } catch (err) {
    console.log('formilyStoreRunFunction -> parsePropsJSON err -> ', err)
  }

  if (typeof fn === 'function') {
    callObject
      ? fn.call(callObject, ...propsArray, ...otherProps)
      : fn(...propsArray, ...otherProps)
  }
}

export function useScope() {
  const field = useField()
  const $array = ArrayBase.useArray?.()
  const $index = ArrayBase.useIndex?.()
  const $record = ArrayBase.useRecord?.()
  const scope = {
    $self: field,
    $form: field.value.form,
    $values: field.value.form.values,
    $observable: (target: any, deps?: any[]) => autorun.memo(() => observable(target), deps),
    $effect: (props: any) => field.value.setComponentProps(props),
    $memo: autorun.memo,
    $props: (props: any) => field.value.setComponentProps(props),
    $array,
    $index,
    $record
  }
  return scope
}
export const formilyStoreEvent = function (
  scope: typeScope,
  eventItem: typeEventItem,
  ...otherProps
) {
  const { api, path, propsOperatorsArray } = eventItem
  if (!api && !path) {
    return
  }
  formilyStoreRunFunction(
    scope,
    path || api,
    propsOperatorsArray,
    ...otherProps
  )
}
export function useInPc() {
  shared.PC = true
}
export function formilyStoreRegister(obj) {
  shared.formilyStore = obj
}

