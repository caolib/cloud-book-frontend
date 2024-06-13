<script setup>
import BookTableView from "@/components/BookTableView.vue";

const selectedKeys = ref(["1"]);
import {ref} from 'vue';
import BorrowTableView from "@/components/BorrowTableView.vue";
import {logoutService} from "@/api/logout.js";
import UserInfoView from "@/components/UserInfoView.vue";

// 登出
const logout = async () => {
  await logoutService();
}

</script>

<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',background: 'white',marginTop:'20px' }">
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
        <!-- 头像 -->
        <a-menu-item key="3">
          <a-avatar :size="64" src="https://s2.loli.net/2024/06/02/wuJknzxaFigDSdL.gif"/>
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
      <book-table-view v-if="selectedKeys[0] === '1'" :style="{marginTop: '50px'}"/>
      <!-- 借阅记录表格 -->
      <borrow-table-view v-if="selectedKeys[0] === '2'" :style="{marginTop: '20px'}"/>
      <user-info-view v-if="selectedKeys[0] === '3'" :style="{marginTop: '20px'}"/>
    </a-layout-content>

    <!-- 底部 -->
    <!--<a-layout-footer :style="{ textAlign: 'center' }">-->
    <!--  我不是源神-->
    <!--</a-layout-footer>-->
  </a-layout>
</template>


<style scoped>
</style>
