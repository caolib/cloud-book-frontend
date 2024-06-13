<script setup>

import {useReaderStore} from "@/stores/reader.js";
import {updateReaderService} from "@/api/reader.js";
import {message} from "ant-design-vue";

const readerStore = useReaderStore();

let reader = readerStore.reader;
console.log(JSON.stringify(reader));

const updateReader = async () => {
  await updateReaderService(reader)
  message.success('保存成功')
}

</script>

<template>
  <!-- 用户信息 -->
  <a-descriptions title="用户信息" bordered layout="vertical" :column="2" style="width: 50%;">
    <a-descriptions-item label="用户名">{{ reader.username }}</a-descriptions-item>
    <a-descriptions-item label="密码">
      <a-input-password allow-clear v-model:value="reader.password" show-count :maxlength="10"/>
    </a-descriptions-item>
    <a-descriptions-item label="昵称">
      <a-input allow-clear v-model:value="reader.nickname" show-count :maxlength="16"/>
    </a-descriptions-item>
    <a-descriptions-item label="年龄">
      <a-input allow-clear v-model:value="reader.age"/>
    </a-descriptions-item>
    <a-descriptions-item label="电话">
      <a-input allow-clear v-model:value="reader.tel"/>
    </a-descriptions-item>
    <a-descriptions-item label="性别">
      <a-select v-model:value="reader.gender">
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
    </a-descriptions-item>
    <a-descriptions-item label="令牌">
      <a-typography-paragraph :copyable="{ tooltip: false }">
        {{ reader.token }}
      </a-typography-paragraph>
    </a-descriptions-item>
    <a-descriptions-item>
      <a-button type="primary" @click="updateReader">保存</a-button>
    </a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>

</style>