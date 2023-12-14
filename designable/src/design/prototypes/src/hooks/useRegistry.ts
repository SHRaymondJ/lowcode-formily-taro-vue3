import { GlobalRegistry, IDesignerRegistry } from '@pind/designable-core'

export const useRegistry = (): IDesignerRegistry => {
  return window['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
