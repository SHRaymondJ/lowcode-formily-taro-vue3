import { computed, ComputedRef, Ref, ref } from 'vue'
import { Workspace } from '@/design/core/src'

import { useContext, WorkspaceSymbol } from '../context'
import { computed as reactiveComputed } from '../shared'

import { useDesigner } from './useDesigner'

export const useWorkspace = (id?: string): Ref<Workspace> | ComputedRef<Workspace> => {
  const designer = useDesigner()
  const workspaceRef = ref()

  const WorkspaceSymbolRef = useContext(WorkspaceSymbol)

  if (window['__DESIGNABLE_WORKSPACE__']) {
    workspaceRef.value = window['__DESIGNABLE_WORKSPACE__']
    return workspaceRef
  }

  return reactiveComputed(() => {
    const workspaceId = id || WorkspaceSymbolRef?.value?.id
    if (workspaceId) {
      return designer.value.workbench.findWorkspaceById(workspaceId)
    }
    return designer.value.workbench.currentWorkspace
  }) as ComputedRef<Workspace>
}
