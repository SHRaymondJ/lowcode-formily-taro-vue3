import { computed } from 'vue'
import { useOperation } from './useOperation'
import { computed as reactiveComputed } from '../shared'

export const useOutlineDragon = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return reactiveComputed(() => operation.value?.outlineDragon)
}
