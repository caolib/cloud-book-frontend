<script setup>
import {onMounted, reactive, ref} from 'vue';
import {getAllBookService} from "@/api/book.js";
import {DeleteTwoTone} from "@ant-design/icons-vue";


// 查询条件
let condition = reactive({
  bookName: null,
  author: null,
  isbn: null,
  number: 0,
  currentPage: 1,
  pageSize: 1000,
})

// 表格数据
let bookData = ref([]);

// 表格列
const columns = [
  {
    title: '书名',
    dataIndex: 'title',
    key: 'title',
    width: '15%',
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '库存',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '书号',
    dataIndex: 'isbn',
    key: 'isbn',
  },

  {
    title: '操作',
    key: 'action',
  },
];

onMounted(async () => {
  const result = await getAllBookService(condition)
  bookData.value = result.data
  console.log(result)
});

</script>

<template>
  <a-table :data-source="bookData" :columns="columns" bordered>
    <template #expandColumnTitle>
      <span style="color: #ff6b6b">展开</span>
    </template>

    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <DeleteTwoTone />
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <div>
        <!--图片-->
        <img :src="record.cover" alt="cover" style="width: 100px; height: 150px">
        <!--介绍-->
        <a-typography-paragraph>
          <pre>{{ record.introduction }}</pre>
        </a-typography-paragraph>
      </div>
    </template>

  </a-table>
</template>


<style scoped>

</style>