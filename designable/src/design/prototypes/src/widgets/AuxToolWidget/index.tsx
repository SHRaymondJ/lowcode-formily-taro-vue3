import { defineComponent, onBeforeUnmount, ref } from 'vue'

import { composeExport } from '@/design/elementcomponents/src/__builtins__'

import { useDesigner, usePrefix, useViewport } from '../../hooks'

import { Cover } from './Cover'
import { DashedBox } from './DashedBox'
import { FreeSelection } from './FreeSelection'
import { Insertion } from './Insertion'
import { Selection } from './Selection'
import { SnapLine } from './SnapLine'
import { SpaceBlock } from './SpaceBlock'

import './styles.less'

const AuxToolWidgetComponent = defineComponent({
  name: 'DnAuxToolWidget',
  props: [],
  setup(props, {}) {
    const engineRef = useDesigner()
    const viewportRef = useViewport()
    const prefixRef = usePrefix('auxtool')
    const _ref = ref<HTMLDivElement>()

    const engineSubs: any = []

    // [engine, viewport]
    const cb1 = engineRef.value.subscribeWith('viewport:scroll', () => {
      if (viewportRef.value.isIframe && _ref.value) {
        _ref.value.style.transform = `perspective(1px) translate3d(${-viewportRef
          .value.scrollX}px,${-viewportRef.value.scrollY}px,0)`
      }
    })

    engineSubs.push(cb1)

    onBeforeUnmount(() => {
      engineSubs.map((enginecb) => enginecb())
    })

    return () => {
      if (!viewportRef.value) return null

      return (
        <div ref={_ref} class={prefixRef.value}>
          <Insertion />
          <SpaceBlock />
          <SnapLine />
          <DashedBox />
          <Selection />
          <Cover />
          <FreeSelection />
        </div>
      )
    }
  },
})

export const AuxToolWidget = composeExport(AuxToolWidgetComponent, {
  displayName: 'AuxToolWidget',
})
