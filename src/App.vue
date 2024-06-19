<script setup>
import {RouterView} from 'vue-router'

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const locale = zhCN;

</script>

<template>
  <a-config-provider
      :locale="locale"
      :theme="{
      token: {
        colorPrimary: '#166ff3',
        colorError: '#ff6b6b',
        fontFamily:'方正楷体',
        fontSize:12
      }
    }">
    <RouterView/>
  </a-config-provider>
</template>

