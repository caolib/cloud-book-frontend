<script setup>
import {h, onMounted, reactive, ref} from 'vue';
import {deleteBookService, getAllBookService} from "@/api/book.js";
import {DeleteFilled} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import dayjs from "dayjs";

const large = ref('large')

// 查询条件
let condition = reactive({
  bookName: '',
  author: '',
  isbn: '',
  number: 0,
  currentPage: 1,
  pageSize: 10,
})
// 查询条件
let bookName = ref();
let author = ref();
let isbn = ref();

// 分页配置
// 分页配置
let pagination = reactive({
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true, // 添加这一行
  onChange: (page, pageSize) => {
    pagination.current = page;
    pagination.pageSize = pageSize; // 更新每页的记录数
    fetchBooks();
  },
});

// 表格数据
let bookData = ref([]);

// 加载中
const loading = ref(false);

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
    width: '15%',
  },
  {
    title: '书号',
    dataIndex: 'isbn',
    key: 'isbn',
    width: '15%',
  },
  {
    title: '库存',
    dataIndex: 'number',
    key: 'number',
    width: '10%',
    sorter: (a, b) => a.number - b.number
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    key: 'introduction',
    width: '30%',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
  },
];

// 页面加载时获取表格数据
onMounted(async () => {
  await fetchBooks()
});

// 获取图书数据
const fetchBooks = async () => {
  loading.value = true;
  // 设置查询条件
  condition.bookName = bookName.value
  condition.isbn = isbn.value
  condition.author = author.value
  condition.currentPage = pagination.current
  condition.pageSize = pagination.pageSize
  // 查询并赋值
  const result = await getAllBookService(condition)
  bookData.value = result.data;
  pagination.total = result.total;
  // console.log('搜索结果:' + JSON.stringify(result.data));
  loading.value = false;
}

const open = ref(false);

// 删除图书
const deleteBook = async (record) => {
  const isbn = record.isbn;
  await deleteBookService(isbn);
  message.success('删除成功!')
  await fetchBooks();
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
  <a-spin :spinning="loading">
    <a-table :data-source="bookData" :columns="columns" :scroll="{ y: '800px' }" :style="{marginTop: '10px'}"
             :pagination="{ position: ['bottomCenter'], ...pagination }"
             :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
      <template #expandColumnTitle/>
      <!--表头-->
      <template #headerCell="{ column }">
        <!--搜索框-->
        <div v-if="column.key === 'title'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">书名</a-tag></span>
          <a-input v-model:value="bookName" @change="fetchBooks" allow-clear placeholder="书名"
                   style="margin-left: 8px; width: 100%;"/>
        </div>
        <div v-if="column.key === 'author'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">作者</a-tag></span>
          <a-input v-model:value="author" @change="fetchBooks" placeholder="作者" allow-clear
                   style="margin-left: 8px; width: 100%;"/>
        </div>
        <div v-if="column.key === 'isbn'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">书号</a-tag></span>
          <a-input v-model:value="isbn" @change="fetchBooks" placeholder="书号" allow-clear
                   style="margin-left: 8px; width: 100%;"/>
        </div>

        <!--默认显示-->
        <div v-if="column.key === 'number'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">库存</a-tag></span>
        </div>
        <div v-if="column.key === 'action'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">操作</a-tag></span>
        </div>
        <div v-if="column.key === 'introduction'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">简介</a-tag></span>
        </div>
      </template>

      <!--表格内容定义-->
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <a-button @click="deleteBook(record)" type="dashed" :size="large" danger :icon="h(DeleteFilled)">删除</a-button>
        </template>
        <template v-if="column.key === 'title'">
          <a>{{ record.title }}</a>
        </template>
      </template>

      <!-- 展开内容定义 -->
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
  </a-spin>

  <!--借阅对话框-->
  <a-modal v-model:open="open" :title="currentBook.title" @ok="borrowBook">
    <div style="{display: flex;flex-direction: column; align-items: center}">
      <img :src="currentBook.cover" alt="cover" style="width: 100px; height: 150px;margin: 10px">
      <blockquote>{{ currentBook.introduction }}</blockquote>
      <a-range-picker v-model:value="date" :disabled-date="disabledDate"/>
    </div>
  </a-modal>

</template>


<style>
/* 表格斑马纹 */
.table-striped {
  background: aliceblue;
}

</style>