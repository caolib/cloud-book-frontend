<script setup>
import {h, onMounted, reactive, ref} from 'vue';
import {getAllBookService} from "@/api/book.js";
import {CheckCircleTwoTone} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import dayjs from "dayjs";
import {borrowService2} from "@/api/borrow.js";

const large = ref('large')

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
    sorter: (a, b) => a.number - b.number
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

// 页面加载时获取表格数据
onMounted(async () => {
  const result = await getAllBookService(condition)
  bookData.value = result.data
  console.log(result)
});


// 图书借阅
const borrow = (record) => {
  currentBook.value = record
  console.log(record);
  open.value = true;
};

const open = ref(false);

const borrowBook = async () => {
  message.success('借阅成功')
  console.log('date:' + date.value)

  const isbn = currentBook.value.isbn;
  const borrowDate = dayjs(date.value[0]).format('YYYY-MM-DD').toString();
  const dueDate = dayjs(date.value[1]).format('YYYY-MM-DD').toString();

  // console.log("isbn:" + isbn)
  // console.log("borrowDate:" + borrowDate)
  // console.log("dueDate:" + dueDate)

  const result = await borrowService2(isbn, borrowDate, dueDate);
  // const result = await borrowService(isbn, dueDate);

  console.log("result:" + result.data);

  open.value = false;
}

// 当前图书
const currentBook = ref({})

// 只能选择今天之后的日期
const disabledDate = (current) => {
  return current && current < dayjs().endOf('day');
};
const date = ref();


</script>

<template>
  <!--数据表格-->
  <a-table :data-source="bookData" :columns="columns" bordered>
    <template #expandColumnTitle>
      <span style="color: #ff6b6b">展开</span>
    </template>

    <template #bodyCell="{ column,record }">
      <!--操作图标-->
      <template v-if="column.key === 'action'">
        <a-button @click="borrow(record)" type="dashed" :size="large" :icon="h(CheckCircleTwoTone)">借阅</a-button>
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

  <!--借阅对话框-->
  <a-modal v-model:open="open" :title="currentBook.title" @ok="borrowBook">
    <img :src="currentBook.cover" alt="cover" style="width: 100px; height: 150px">
    <a-range-picker v-model:value="date" :disabled-date="disabledDate"/>
  </a-modal>
</template>


<style scoped>

</style>