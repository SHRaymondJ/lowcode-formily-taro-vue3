import { reactive } from 'vue'
import { View, Text, Button } from '@tarojs/components'

export default {
  name: 'btnTest',
  components: {
    View,
    Text,
    Button,
  },
  setup() {
    const state = reactive({
      msg: '欢迎使用 NutUI 开发小程序',
      msg2: '你成功了～',
    })

    const handleClick = (msg) => {
      state.msg = msg
    }

    return () => {
      return (
        <View>
          <View>
            <Text>{state.msg}</Text>
          </View>
          <Button onClick={() => {
            handleClick(state.msg2)
          }}>Confirm</Button>
        </View>
      )
    }
  },
}