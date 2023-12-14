import { computed, inject, ref, ComputedRef, unref } from 'vue'
import { IDesignerLayoutContext } from '../types'
import { useLayout } from './useLayout'

export const useTheme = (): ComputedRef<IDesignerLayoutContext['theme']> => {
    const layoutRef = useLayout()
    return computed(
        () => unref(layoutRef)?.theme
    )
}
