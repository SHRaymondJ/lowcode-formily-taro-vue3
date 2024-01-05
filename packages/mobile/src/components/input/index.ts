import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Input as _NutInput } from '@nutui/nutui-taro'

import { composeExport, transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type InputProps = typeof _NutInput

const TransformNutInput = transformComponent<InputProps>(_NutInput, {
  change: 'update:modelValue'
})

const InnerInput = connect(
  TransformNutInput,
  mapProps({
    // [field prop name] : [NutUI prop name]
    value: 'modelValue',
    readOnly: 'readonly'
  }),
  mapReadPretty(PreviewText.Input)
)

const TextArea = connect(
  InnerInput,
  mapProps(props => {
    return {
      ...props,
      type: 'textarea'
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea
})

export default Input
