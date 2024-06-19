<script setup>
import {ref} from "vue";
import {message} from "ant-design-vue";
import {useAdminStore} from "@/stores/admin.js";
import {updateAdminService} from "@/api/admin.js";

const adminStore = useAdminStore();
let admin = adminStore.admin;

// console.log(JSON.stringify(admin));

const loading = ref(false);

// 更新管理员信息
const updateAdmin = async () => {
  loading.value = true;
  console.log(JSON.stringify(admin));
  await updateAdminService(admin);
  message.success('保存成功')
  loading.value = false;
}

</script>

<template>
  <!-- 管理员信息 -->
  <a-descriptions title="管理员信息" bordered layout="vertical" :column="2" style="width: 70vw;">
    <a-descriptions-item label="用户名">{{ admin.username }}</a-descriptions-item>
    <a-descriptions-item label="密码">
      <a-input-password allow-clear v-model:value="admin.password" show-count :maxlength="10"/>
    </a-descriptions-item>
    <a-descriptions-item label="昵称">
      <a-input allow-clear v-model:value="admin.nickname" show-count :maxlength="16"/>
    </a-descriptions-item>
    <a-descriptions-item label="令牌">
      <a-typography-paragraph copyable>
        {{ admin.token }}
      </a-typography-paragraph>
    </a-descriptions-item>
    <a-descriptions-item>
      <a-button type="primary" :loading="loading" @click="updateAdmin">保存</a-button>
    </a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>

</style>