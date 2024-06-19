<script setup>

import { ref } from 'vue'
import { adminLogoutService } from '@/api/logout.js'
import AdminBookView from '@/components/admin/AdminBookView.vue'
import AdminInfoView from '@/components/admin/AdminInfoView.vue'
import ReaderView from '@/components/admin/ReaderView.vue'

const selectedKeys = ref(['1'])

// 登出
const logout = async () => {
  await adminLogoutService()
}

</script>

<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',background: 'white',marginTop:'1px' }">
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal" :style="{ lineHeight: '10vh' }">
        <!-- 头像 -->
        <a-menu-item key="3">
          <a-avatar :size="64" src="https://s2.loli.net/2024/06/02/wuJknzxaFigDSdL.gif" />
        </a-menu-item>
        <a-menu-item key="1">
          <a-button type="primary" ghost size="large">图书</a-button>
        </a-menu-item>
        <a-menu-item key="2">
          <a-button type="primary" ghost size="large">读者</a-button>
        </a-menu-item>
        <a-menu-item key="3">
          <a-button type="primary" ghost size="large">我的</a-button>
        </a-menu-item>
        <a-menu-item key="4">
          <a-button size="large" @click="logout" danger>登出</a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <!-- 中间 -->
    <a-layout-content :style="{ padding: '0 50px', marginTop: '80px' }">
      <!-- 书籍表格 -->
      <admin-book-view v-if="selectedKeys[0] === '1'" :style="{marginTop: '50px'}" />
      <!-- 用户信息管理 -->
      <reader-view v-if="selectedKeys[0] === '2'" :style="{marginTop: '20px'}" />
      <!-- 管理员信息管理 -->
      <admin-info-view v-if="selectedKeys[0] === '3'" :style="{marginTop: '20px'}" />
    </a-layout-content>
  </a-layout>
</template>


<style scoped>
</style>
