import { defineComponent } from 'vue'
import cls from 'classnames'

import { MobileBody } from './body'
import { usePrefix } from '../../hooks'
import './styles.less'

export const MobileSimulator = defineComponent({
  setup(props, { attrs, slots }) {
    const prefixRef = usePrefix('mobile-simulator')
    return () => {
      return (
        <div {...attrs} class={cls(prefixRef.value)}>
          <div class={prefixRef.value + '-content'}>
            <MobileBody>{slots.default?.()}</MobileBody>
          </div>
        </div>
      )
    }
  },
})
