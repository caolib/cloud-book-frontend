<script setup>
import {h, onMounted, reactive, ref} from 'vue';
import {addBookService, deleteBookService, getAllBookService, updateBookService} from "@/api/book.js";
import {DeleteFilled, SaveTwoTone, PlusCircleTwoTone} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

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
    width: '10%',
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
    width: '8%',
    sorter: (a, b) => a.number - b.number
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    key: 'introduction',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    width: '15%',
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

// 删除图书
const deleteBook = async (record) => {
  const isbn = record.isbn;
  await deleteBookService(isbn);
  message.success('删除成功!')
  await fetchBooks();
}

// 修改图书信息
const updateBook = async (record) => {
  console.log('修改图书信息:' + JSON.stringify(record));
  await updateBookService(record);
  message.success('保存成功!');
  await fetchBooks();
}

// 添加书籍
let show = ref(false);
const showAdd = () => {
  show.value = true;
}

const addBook = reactive({
  title: null,
  isbn: null,
  cover: null,
  introduction: null,
  number: null,
  author: null
})

// 添加
const add = async () => {
  console.log('添加书籍:' + JSON.stringify(addBook));
  await addBookService(addBook);
  show.value = false;
  await fetchBooks();
}

</script>

<template>
  <!--数据表格-->
  <a-spin :spinning="loading">
    <a-table :data-source="bookData" :columns="columns" :scroll="{ y: '800px' }" :style="{marginTop: '10px'}"
             :pagination="{ position: ['bottomCenter'], ...pagination }"
             :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
      <template #expandColumnTitle/>
      <!--表头自定义-->
      <template #headerCell="{ column }">
        <!--增加搜索框的表头-->
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

        <!--无搜索框-->
        <div v-if="column.key === 'number'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">库存</a-tag></span>
        </div>
        <div v-if="column.key === 'action'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">操作</a-tag></span>
          <a-button @click="showAdd" type="dashed" :icon="h(PlusCircleTwoTone)" style="margin-left: 20px">添加
          </a-button>
        </div>
        <div v-if="column.key === 'introduction'" style="display: flex; align-items: center;">
          <span><a-tag color="blue">简介</a-tag></span>
        </div>
      </template>

      <!--表格内容自定义-->
      <template #bodyCell="{ column,record }">
        <!--书名-->
        <template v-if="column.key === 'title'">
          <a-typography-paragraph v-model:content="record.title" editable/>
        </template>
        <!--作者-->
        <template v-if="column.key === 'author'">
          <a-typography-paragraph v-model:content="record.author" editable/>
        </template>
        <!--书号-->
        <template v-if="column.key === 'isbn'">
          <a-typography-paragraph v-model:content="record.isbn" copyable/>
        </template>
        <!--库存-->
        <template v-if="column.key === 'number'">
          <a-typography-paragraph v-model:content="record.number" editable/>
        </template>
        <!--操作栏按钮-->
        <template v-if="column.key === 'action'">
          <a-button @click="updateBook(record)" type="dashed" :size="large" :icon="h(SaveTwoTone)"
                    style="margin-right: 20px">保存
          </a-button>
          <a-button @click="deleteBook(record)" type="dashed" :size="large" danger :icon="h(DeleteFilled)">删除
          </a-button>
        </template>
      </template>

      <!-- 展开内容定义 -->
      <template #expandedRowRender="{ record }">
        <div>
          <!--图片-->
          <img :src="record.cover" alt="cover" style="width: 100px; height: 150px">
          <a-typography-paragraph v-model:content="record.cover" editable copyable/>
          <!--介绍-->
          <a-typography-paragraph v-model:content="record.introduction" editable/>
        </div>
      </template>
    </a-table>
  </a-spin>

  <!-- 添加对话框 -->
  <a-modal v-model:open="show" title="添加书籍" :confirm-loading="loading" @ok="add">
    <div :style="{padding:'20px'}">
      <!-- 添加书籍表单 -->
      <a-form :model="addBook">
        <!-- 书名 -->
        <a-form-item label="书名" name="title" :rules="[{ required: true, message: '请输入书名' }]">
          <a-input v-model:value="addBook.title"/>
        </a-form-item>
        <!-- 书号 -->
        <a-form-item label="书号" name="isbn" :rules="[{ required: true, message: '请输入书号' }]">
          <a-input v-model:value="addBook.isbn"/>
        </a-form-item>
        <!-- 库存 -->
        <a-form-item label="库存" name="number" :rules="[{ required: true, message: '请输入库存' }]">
          <a-input-number v-model:value="addBook.number" max="999999999" style="width: 100%;"/>
        </a-form-item>
        <!-- 作者 -->
        <a-form-item label="作者" name="author" :rules="[{ message: '请输入作者' }]">
          <a-input v-model:value="addBook.author"/>
        </a-form-item>
        <!-- 简介 -->
        <a-form-item label="简介" name="introduction" :rules="[{message: '请输入简介' }]">
          <a-input v-model:value="addBook.introduction"/>
        </a-form-item>
        <!-- 封面 -->
        <a-form-item label="封面" name="cover" :rules="[{message: '请输入封面' }]">
          <a-input v-model:value="addBook.cover"/>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>

</template>


<style>
/* 表格斑马纹 */
.table-striped {
  background: aliceblue;
}

</style>
