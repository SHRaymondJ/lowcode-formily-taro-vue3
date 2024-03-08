import { GlobalRegistry, IDesignerRegistry } from '@/design/core/src'

export const useRegistry = (): IDesignerRegistry => {
  return window['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
