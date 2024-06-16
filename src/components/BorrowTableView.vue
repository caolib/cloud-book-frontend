<script setup>

import {h, onMounted, ref} from "vue";
import {
  deleteBorrowBatchService,
  deleteByIdService,
  getBorrowByReaderIdService,
  returnBookService
} from "@/api/borrow.js";
import {CheckCircleTwoTone, DeleteOutlined} from "@ant-design/icons-vue";
import {Button, message, notification} from "ant-design-vue";

const large = ref('large')

// 借阅数据
let borrowData = ref([]);

// 加载状态
const loading = ref(false);

// 统计变量
let returnedCount = ref(0);
let notReturnedCount = ref(0);
let totalCount = ref(0);

// 查询用户借阅记录
const fetchBorrows = async () => {
  loading.value = true;
  const result = await getBorrowByReaderIdService();
  borrowData.value = result.data;
  loading.value = false;
  // 计算进度条值
  returnedCount.value = borrowData.value.filter(borrow => borrow.status).length;
  totalCount.value = borrowData.value.length;
  notReturnedCount.value = totalCount.value - returnedCount.value;
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
    width: '20%',
  },
  {
    title: '借书日期',
    dataIndex: 'borrowDate',
    key: 'borrowDate',
    width: 'auto',
  },
  {
    title: '应该归还日期',
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: 'auto',
  },
  {
    title: '实际归还日期',
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: 'auto',
  },
  {
    title: '是否归还',
    dataIndex: 'status',
    key: 'status',
    width: 'auto',
  },
  {
    title: '操作',
    key: 'action',
  },
];

// 选中的行
let selectedRowKeys = ref([]);

// 选中行变化
const onSelectChange = (selectedKeys) => {
  selectedRowKeys.value = [...selectedKeys];
  let key = 'batchDelete';
  // 没有选中行删除通知
  if (selectedRowKeys.value.length === 0) {
    notification.close(key)
    return;
  }
  // 有选中行弹出通知
  notification.open({
    key: key,
    message: '批量删除借阅记录' + selectedRowKeys.value.length + '条',
    description: "全部删除后将无法恢复，是否继续？",
    duration: 5,
    btn: () => h(Button, {
          danger: true,
          size: 'large',
          onClick: async () => {
            await deleteBorrowBatchService(selectedRowKeys.value);
            message.success('删除成功');
            await fetchBorrows();
            notification.close(key)
          }
        }, () => '确认删除',
    ), onClose: close
  });
};

// 行多选属性
const rowSelection = ref({
  selectedRowKeys: selectedRowKeys,
  onChange: onSelectChange,
  columnWidth: '5%',
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
  <div
      style="display: flex; justify-content: space-between; align-items: center; height: 90%; background: transparent">
    <!-- 借阅表格 -->
    <a-spin :spinning="loading">
      <a-table :data-source="borrowData" :columns="columns" :row-key="'id'" :pagination="false"
               :row-selection="rowSelection" :scroll="{ y: '800px' }" :style="{marginTop: '10px',width:'1200px'}"
               bordered>
        <!--表头自定义，修改为标签-->
        <template #headerCell="{ column }">
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
          <!--操作栏按钮-->
          <template v-if="column.key === 'action'">
            <a-button v-if="record.status" @click="deleteBorrow(record)" type="dashed" danger :size="large"
                      :icon="h(DeleteOutlined)">删除
            </a-button>
            <a-button v-else @click="returnBook(record)" type="dashed" :size="large" :icon="h(CheckCircleTwoTone)">
              归还
            </a-button>
          </template>
          <!--书名-->
          <template v-if="column.key === 'bookName'">
            <a>{{ record.bookName }}</a>
          </template>
          <!--状态标签-->
          <template v-if="column.key === 'status'">
            <a-tag v-if="record.status" color="green">已归还</a-tag>
            <a-tag v-else color="red">未归还</a-tag>
          </template>
        </template>
      </a-table>
    </a-spin>
    <!-- 统计信息 -->
    <div style="display: flex; justify-content: center; align-items: center;flex-direction: column">
      <!-- 圆形进度条 -->
      <a-progress :percent="(returnedCount*100/totalCount).toFixed(2)" type="circle" :size="400" :strokeWidth="20"/>
      <!-- 统计信息条 -->
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <a-statistic title="已归还" :value="returnedCount" :prefix="h(CheckCircleTwoTone)"
                     :valueStyle="{ color: 'green' }" style="margin: 20px;"/>
        <a-statistic title="未归还" :value="notReturnedCount" :prefix="h(DeleteOutlined)"
                     :valueStyle="{ color: 'red' }" style="margin: 20px;"/>
        <a-statistic title="总数" :value="totalCount" style="margin: 20px;"/>
      </div>
    </div>

  </div>
</template>

<style scoped>
.ant-tag {
  font-size: 18px; /* 标签字体大小 */
}

body {
  background-image: none;
}
</style>