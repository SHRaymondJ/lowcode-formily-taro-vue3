<template>
  <view class="index">
    <FormPage :form="form" v-bind="theJson.form">
      <SchemaField :schema="theJson.schema"></SchemaField>
    </FormPage>
    <Input></Input>
  </view>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { createForm } from '@formily/core'
import { Input } from '@nutui/nutui-taro'

import { FormPage, SchemaField } from '@/components'
import { initFormily } from '@/utils/formily'

initFormily()
const form = createForm({
  initialValues: {
    c: '123'
  }
})

const theJson = {
  form: {
    style: {
      backgroundColor: 'rgba(247,248,250,1)'
    }
  },
  schema: {
    'type': 'object',
    'properties': {
      a: {
        'type': 'string',
        'title': '文本',
        'x-component': 'Text',
        'x-designable-id': 'pqmwcijj7vt',
        'x-index': 0,
        'name': 'a',
        'x-component-props': {
          style: {
            display: 'block',
            background: 'red',
            width: '10vw',
            height: '10vh',
          },
        },
        'x-content': '123'
      },
      b: {
        'type': 'string',
        'title': '文本',
        'x-component': 'Text',
        'x-designable-id': 'pqmwcijj7vt1',
        'x-index': 1,
        'name': 'b',
        'x-component-props': {
          style: {
            display: 'block',
            background: 'red',
            width: '10vw',
            height: '10vh',
          },
        },
        'x-content': '1234'
      },
      c: {
        'type': 'string',
        'title': '文本',
        'x-component': 'NutInput',
        'x-designable-id': 'pqmwcijj7vt2',
        'x-index': 2,
        'name': 'c',
        'x-component-props': {
          style: {
            display: 'block',
            background: 'red',
            width: '10vw',
            height: '10vh',
          },
        },
      },
      d: {
        'type': 'string',
        'title': '文本',
        'x-component': 'Input',
        'x-designable-id': 'pqmwcijj7vt3',
        'x-index': 3,
        'name': 'd',
        'x-component-props': {
          style: {
            display: 'block',
            background: 'red',
            width: '10vw',
            height: '10vh',
          },
        },
      }
    },
    'x-designable-id': '9g4ikf4qskr'
  }
}
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
