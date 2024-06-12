<script setup>
import {RouterView} from 'vue-router'

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const locale = zhCN;

</script>

<template>
  <!--  <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>-->
  <a-config-provider
      :locale="locale"
      :theme="{
      token: {
        colorPrimary: '#108ee9',
        colorError: '#ff6b6b',
        fontFamily:'方正楷体',
        fontSize:16
      }
    }">

    <RouterView/>

    <a-back-top tooltip="回到顶部"/>
  </a-config-provider>
</template>

