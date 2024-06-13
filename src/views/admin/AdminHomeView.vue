<script setup>

import {ref} from 'vue';
import {adminLogoutService} from "@/api/logout.js";
import AdminBookView from "@/components/admin/AdminBookView.vue";

const selectedKeys = ref(["1"]);

// 登出
const logout = async () => {
  await adminLogoutService();
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
      <!--&lt;!&ndash; 书籍表格 &ndash;&gt;-->
      <admin-book-view v-if="selectedKeys[0] === '1'" :style="{marginTop: '50px'}"/>
      <!--&lt;!&ndash; 借阅记录表格 &ndash;&gt;-->
      <!--<borrow-table-view v-if="selectedKeys[0] === '2'" :style="{marginTop: '20px'}"/>-->
      <!--<user-info-view v-if="selectedKeys[0] === '3'" :style="{marginTop: '20px'}"/>-->
    </a-layout-content>
  </a-layout>
</template>


<style scoped>
</style>
