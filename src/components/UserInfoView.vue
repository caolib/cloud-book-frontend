<script setup>
import { ref } from 'vue'
import { useReaderStore } from '@/stores/reader.js'
import { updateReaderService } from '@/api/reader.js'
import { message } from 'ant-design-vue'

const readerStore = useReaderStore()

let reader = readerStore.reader
let tel = reader.tel

const flushReader = async () => {
  loading.value = true
  console.log("tel:"+tel)
  reader.tel = tel
  readerStore.setReader(reader)
  reader = readerStore.reader
  console.log(JSON.stringify(reader))
  loading.value = false
}

const loading = ref(false)

// 更新用户信息
const updateReader = async () => {
  loading.value = true
  await updateReaderService(reader).then(res => {
    if (res.code === 1) {
      readerStore.setReader(reader)
      tel = reader.tel
      message.success('保存成功!')
    }
  }).finally(() => {
    loading.value = false
  })

}

</script>

<template>
  <!-- 用户信息 -->
  <a-descriptions title="用户信息" bordered layout="vertical" :column="2" style="width: 70vw;">
    <a-descriptions-item label="用户名">{{ reader.username }}</a-descriptions-item>
    <a-descriptions-item label="密码">
      <a-input-password allow-clear v-model:value="reader.password" show-count :maxlength="10" />
    </a-descriptions-item>
    <a-descriptions-item label="昵称">
      <a-input allow-clear v-model:value="reader.nickname" show-count :maxlength="16" />
    </a-descriptions-item>
    <a-descriptions-item label="年龄">
      <a-input allow-clear v-model:value="reader.age" />
    </a-descriptions-item>
    <a-descriptions-item label="电话">
      <a-input allow-clear v-model:value="reader.tel" />
    </a-descriptions-item>
    <a-descriptions-item label="性别">
      <a-select v-model:value="reader.gender">
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
    </a-descriptions-item>
    <a-descriptions-item label="令牌">
      <a-typography-paragraph copyable>
        {{ reader.token }}
      </a-typography-paragraph>
    </a-descriptions-item>
    <a-descriptions-item>
      <a-button type="primary" :loading="loading" @click="updateReader">保存</a-button>
      <a-button danger style="margin-left: 10px" @click="flushReader">取消</a-button>
    </a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>

</style>