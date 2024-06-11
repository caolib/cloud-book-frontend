<script setup>
import BookTableView from "@/components/BookTableView.vue";

import {getAllBookService} from "@/api/book";


const selectedKeys = ref(["1"]);
import {onMounted, reactive, ref} from 'vue';

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];



</script>

<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo"/>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>

    <!-- 中间 -->
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">

      <!-- 书籍表格 -->
      <book-table-view :style="{marginTop: '50px'}"/>
    </a-layout-content>

    <!-- 底部 -->
    <a-layout-footer :style="{ textAlign: 'center' }">
      这是页脚
    </a-layout-footer>
  </a-layout>
</template>


<style scoped>
</style>
