import { computed } from 'vue'
import { useOperation } from './useOperation'
import { computed as reactiveComputed } from '../shared'

export const useDragon = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return reactiveComputed(() => operation.value?.viewportDragon)
}
