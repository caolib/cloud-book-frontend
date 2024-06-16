<script setup>
import {deleteReaderService, getAllReaderService, updateReaderService} from '@/api/reader.js'
import {h, onMounted, reactive, ref} from 'vue'
import {DeleteFilled, SaveTwoTone, SyncOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'

// 查询条件
const condition = reactive({
  username: '',
  nickname: '',
  tel: ''
})

// 表格列
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: '20%'
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    width: 'auto'
  },
  {
    title: '电话',
    dataIndex: 'tel',
    key: 'tel',
    width: '20%'
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    width: '20%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 'auto'
  },
  {
    title: '操作',
    key: 'action',
    width: '20%'
  }
]

// 更新读者数据
const updateReader = async (record) => {
  console.log(JSON.stringify(record))
  await updateReaderService(record)
  await fetchReaders()
  message.success('用户' + record.username + '信息更新成功')
}

// 删除读者数据
const deleteReader = async (record) => {
  console.log(JSON.stringify(record))
  await deleteReaderService(record.id)
  await fetchReaders()
  message.success('成功删除用户' + record.username)
}

// 读者数据
const readerData = ref([])

// 获取所有读者数据
const fetchReaders = async () => {
  loading.value = true
  const result = await getAllReaderService(condition)
  readerData.value = result.data
  loading.value = false
}

// 加载中显示控制
const loading = ref(false)

onMounted(async () => {
  await fetchReaders()
})

// 保存、删除按钮大小
const large = ref('large')
</script>

<template>
  <!-- 借阅表格 -->
  <a-spin :spinning="loading">
    <a-table
        :data-source="readerData"
        :columns="columns"
        :pagination="false"
        :scroll="{ y: '800px' }"
        :style="{ marginTop: '10px', width: '1200px' }"
        bordered>
      <!--表头-->
      <template #headerCell="{ column }">
        <!--带搜索框的表头-->
        <div v-if="column.key === 'username'" style="display: flex; align-items: center">
          <span><a-tag color="blue">用户名</a-tag></span>
          <a-input v-model:value="condition.username" @change="fetchReaders" allow-clear placeholder="用户名"
                   style="margin-left: 8px; width: 100%"/>
        </div>
        <div v-if="column.key === 'nickname'" style="display: flex; align-items: center">
          <span><a-tag color="blue">昵称</a-tag></span>
          <a-input v-model:value="condition.nickname" @change="fetchReaders" placeholder="昵称" allow-clear
                   style="margin-left: 8px; width: 100%"/>
        </div>
        <div v-if="column.key === 'tel'" style="display: flex; align-items: center">
          <span><a-tag color="blue">电话</a-tag></span>
          <a-input v-model:value="condition.tel" @change="fetchReaders" placeholder="电话" allow-clear
                   style="margin-left: 8px; width: 100%"/>
        </div>
        <!-- 操作列表头增加刷新按钮 -->
        <div v-if="column.key === 'action'" style="display: flex; align-items: center">
          <span><a-tag color="blue">操作</a-tag></span>
          <a-button style="margin-left: 10px" @click="fetchReaders" type="dashed">刷新
            <sync-outlined spin/>
          </a-button>
        </div>
      </template>

      <!--表格内容定义，可编辑-->
      <template #bodyCell="{ column, record }">
        <!--密码-->
        <template v-if="column.key === 'password'">
          <a-typography-paragraph v-model:content="record.password" editable/>
        </template>
        <!--电话-->
        <template v-if="column.key === 'tel'">
          <a-typography-paragraph v-model:content="record.tel" editable/>
        </template>
        <!--昵称-->
        <template v-if="column.key === 'nickname'">
          <a-typography-paragraph v-model:content="record.nickname" editable/>
        </template>
        <!--性别-->
        <template v-if="column.key === 'gender'">
          <a-select v-model:value="record.gender">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </template>
        <!--操作栏按钮-->
        <template v-if="column.key === 'action'">
          <div style="display: flex">
            <!--保存-->
            <a-button @click="updateReader(record)" type="dashed" :size="large" :icon="h(SaveTwoTone)"
                      style="margin-right: 20px">保存
            </a-button>
            <!--删除-->
            <a-popconfirm title="确定删除该读者吗？" ok-text="Yes" cancel-text="我再想想"
                          @confirm="deleteReader(record)">
              <a-button type="dashed" :size="large" danger :icon="h(DeleteFilled)">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </a-spin>
</template>

<style scoped></style>
