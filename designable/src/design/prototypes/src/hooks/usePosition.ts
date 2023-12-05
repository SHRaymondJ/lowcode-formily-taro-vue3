import { computed, ComputedRef } from 'vue'
import { IDesignerLayoutContext } from '../types'
import { useLayout } from './useLayout'

export const usePosition = (): ComputedRef<IDesignerLayoutContext['position']> => {
    const layoutRef = useLayout()
    return computed(
        () => layoutRef.value?.position
    )
}
