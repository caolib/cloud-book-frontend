<script setup>
import {h, onMounted, reactive, ref} from 'vue';
import {getAllBookService} from "@/api/book.js";
import {CheckCircleTwoTone} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import dayjs from "dayjs";
import {borrowService2} from "@/api/borrow.js"

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
    width: '10%',
  },
  {
    title: '库存',
    dataIndex: 'number',
    key: 'number',
    width: '10%',
    sorter: (a, b) => a.number - b.number
  },
  {
    title: '书号',
    dataIndex: 'isbn',
    key: 'isbn',
    width: '15%',
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
  // 设置查询条件
  condition.bookName = bookName.value
  condition.isbn = isbn.value
  condition.author = author.value
  condition.currentPage = pagination.current
  condition.pageSize = pagination.pageSize
  // 查询并赋值
  const result = await getAllBookService(condition)
  bookData.value = result.data
  pagination.total = result.total
  console.log('搜索结果:' + JSON.stringify(result.data));
}


// 弹出借阅对话框
const borrow = (record) => {
  currentBook.value = record
  console.log(record);
  open.value = true;
};
const open = ref(false);

// 借阅图书
const borrowBook = async () => {
  const isbn = currentBook.value.isbn;
  if (date.value == null) {
    message.error('请选择借阅时间!')
    return;
  }
  const borrowDate = dayjs(date.value[0]).format('YYYY-MM-DD').toString();
  const dueDate = dayjs(date.value[1]).format('YYYY-MM-DD').toString();
  const result = await borrowService2(isbn, borrowDate, dueDate);
  console.log("result:" + result.data);

  message.success('借阅成功!')
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
  <a-table :data-source="bookData" :columns="columns" :scroll="{ y: '800px' }" :style="{marginTop: '10px'}"
           :pagination="{ position: ['bottomCenter'], ...pagination }"
           :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
    <!--展开列标题-->
    <template #expandColumnTitle/>
    <!--<template #expandColumnTitle>-->
    <!--  <span><a-tag color="blue">展开</a-tag></span>-->
    <!--</template>-->

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
        <a-button @click="borrow(record)" type="dashed" :size="large" :icon="h(CheckCircleTwoTone)">借阅</a-button>
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
