<script setup>
import BookTableView from '@/components/BookTableView.vue'

const selectedKeys = ref(['1'])
import { ref } from 'vue'
import BorrowTableView from '@/components/BorrowTableView.vue'
import { logoutService } from '@/api/logout.js'
import UserInfoView from '@/components/UserInfoView.vue'

// 登出
const logout = async () => {
  await logoutService()
}

</script>

<template>
  <a-layout>
    <a-layout-header :style="{ position:'fixed', zIndex: 1, width: '100%',background: 'white',marginTop:'1px' }">
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal" :style="{ lineHeight: '10vh' }">
        <!-- 头像 -->
        <!--https://img2.imgtp.com/2024/05/26/dequKQxT.png-->
        <a-menu-item key="3">
          <a-avatar :size="64" src="https://s2.loli.net/2024/06/02/wuJknzxaFigDSdL.gif" />
        </a-menu-item>
        <a-menu-item key="1">
          <a-button type="primary" ghost size="large">图书</a-button>
        </a-menu-item>
        <a-menu-item key="2">
          <a-button type="primary" ghost size="large">借阅</a-button>
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
      <book-table-view v-if="selectedKeys[0] === '1'" :style="{marginTop: '50px', height:'80vh'}" />
      <!-- 借阅记录表格 -->
      <borrow-table-view v-if="selectedKeys[0] === '2'" :style="{marginTop: '10px'}" />
      <!--个人信息-->
      <user-info-view v-if="selectedKeys[0] === '3'" :style="{marginTop: '10px'}" />
    </a-layout-content>

  </a-layout>
</template>


<style scoped>
</style>
