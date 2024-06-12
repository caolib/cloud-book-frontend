<script setup>

import {h, onMounted, ref} from "vue";
import {deleteByIdService, getBorrowByReaderIdService, returnBookService} from "@/api/borrow.js";
import {CheckCircleTwoTone, DeleteOutlined, SyncOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

const large = ref('large')

// 借阅数据
let borrowData = ref([]);

const fetchBorrows = async () => {
  // 查询并赋值
  const result = await getBorrowByReaderIdService();
  borrowData.value = result.data;
  console.log('borrow:' + JSON.stringify(borrowData.value));
}

onMounted(async () => {
  await fetchBorrows()
});

// 表格列
const columns = [
  {
    title: '书名',
    dataIndex: 'bookName',
    key: 'bookName',
    width: '15%',
  },
  {
    title: '借书日期',
    dataIndex: 'borrowDate',
    key: 'borrowDate',
    width: '10%',
  },
  {
    title: '应该归还日期',
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: '10%',
  },
  {
    title: '实际归还日期',
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: '10%',
  },
  {
    title: '是否归还',
    dataIndex: 'status',
    key: 'status',
    width: '7%',
  },
  {
    title: '操作',
    key: 'action',
    width: '10%',
  },
];


// 选中的行
let selectedRowKeys = ref([]);

const onSelectChange = (selectedKeys) => {
  selectedRowKeys.value = [...selectedKeys];
  console.log('selectedRowKeys changed: ', JSON.stringify(selectedRowKeys.value));
};

const rowSelection = ref({
  selectedRowKeys: selectedRowKeys,
  onChange: onSelectChange,
  columnWidth: '10%',
  getCheckboxProps: (record) => ({disabled: !record.status})
});


// 删除借阅记录
const deleteBorrow = async (record) => {

  await deleteByIdService(record.id);
  message.success('成功删除借阅记录:' + record.bookName);
  await fetchBorrows()
}

// 归还书籍
const returnBook = async (record) => {
  await returnBookService(record.id, record.isbn);
  await fetchBorrows();
  message.success('成功归还书籍:' + record.bookName);
}

</script>

<template>

  <!--<a-button type="primary" shape="circle" :icon="h(SyncOutlined)" @click="fetchBorrows" style="margin-left: 10px"/>-->

  <a-table :data-source="borrowData"
           :columns="columns"
           :row-key="'id'"
           :pagination="false"
           :row-selection="rowSelection"
           :scroll="{ y: '800px' }" :style="{marginTop: '10px'}" bordered>
    <!--表头-->
    <template #headerCell="{ column }">
      <!--搜索框-->
      <div v-if="column.key === 'bookName'" style="display: flex; align-items: center;">
        <span><a-tag color="blue">书名</a-tag></span>
      </div>
      <div v-if="column.key === 'borrowDate'" style="display: flex; align-items: center;">
        <span><a-tag color="blue">借书日期</a-tag></span>
      </div>
      <div v-if="column.key === 'dueDate'" style="display: flex; align-items: center;">
        <span><a-tag color="blue">应该归还日期</a-tag></span>
      </div>
      <div v-if="column.key === 'returnDate'" style="display: flex; align-items: center;">
        <span><a-tag color="blue">实际归还日期</a-tag></span>
      </div>
      <div v-if="column.key === 'status'" style="display: flex; align-items: center;">
        <span><a-tag color="blue">是否归还</a-tag></span>
      </div>
      <div v-if="column.key === 'action'" style="display: flex; align-items: center;">
        <span><a-tag color="blue">操作</a-tag></span>
      </div>
    </template>

    <!--表格内容定义-->
    <template #bodyCell="{ column,record }">
      <template v-if="column.key === 'action'">
        <a-button v-if="record.status" @click="deleteBorrow(record)" type="dashed" danger :size="large"
                  :icon="h(DeleteOutlined)">
          删除
        </a-button>
        <a-button v-else @click="returnBook(record)" type="dashed" :size="large" :icon="h(CheckCircleTwoTone)">
          归还
        </a-button>
      </template>
      <template v-if="column.key === 'bookName'">
        <a>{{ record.bookName }}</a>
      </template>

      <template v-if="column.key === 'status'">
        <a-tag v-if="record.status" color="green">已归还</a-tag>
        <a-tag v-else color="red">未归还</a-tag>
      </template>
    </template>
  </a-table>
</template>

<style scoped>
.ant-tag {
  font-size: 18px; /* 或者其他你想要的大小 */
}
</style>