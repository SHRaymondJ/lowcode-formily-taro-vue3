import { inject, onBeforeUnmount, Ref,ref } from 'vue'
import { Engine } from '@/design/core/src'
import { isFn } from '@/design/shared/src'

import { DesignerEngineSymbol } from '../context'

export interface IEffects {
  (engine: Engine): void
}

export const useDesigner = (effects?: IEffects): Ref<Engine> => {
  const designer = window['__DESIGNABLE_ENGINE__']
    ? ref(window['__DESIGNABLE_ENGINE__'])
    : inject(DesignerEngineSymbol, ref())

  const unRef: any = isFn(effects) ? effects(designer.value) : undefined

  onBeforeUnmount(() => {
    unRef?.()
  })
  return designer
}
