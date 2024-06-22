<script setup>
import {reactive, ref} from 'vue'
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
import {adminLoginService} from '@/api/login'
import {message} from 'ant-design-vue'
import {useAdminStore} from '@/stores/admin.js'

import router from '@/router'
import {adminRegisterService} from '@/api/register.js'

const adminStore = useAdminStore()

// 返回的管理员信息
let returnAdmin = reactive({
  id: '',
  username: '',
  nickname: '',
  password: '',
  token: ''
})

// 用户名密码
const loginDto = reactive({
  username: '',
  password: ''
})

const loading = ref(false)

// 管理员登录
const login = async function () {
  loading.value = true
  adminLoginService(loginDto)
      .then(async (res) => {
        returnAdmin = res.data
        returnAdmin.password = loginDto.password
        message.success('hello,' + res.data.nickname, 3)
        // 保存用户信息和token
        adminStore.setAdmin(returnAdmin)
        loading.value = false
        await router.push('/admin/home')
      })
      .catch((error) => {
        loading.value = false
        console.log(error)
      })
}

// 注册
const registerDto = reactive({
  username: '',
  password: '',
  nickname: ''
})

// 注册
const register = async () => {
  console.log('registerDto:' + JSON.stringify(registerDto))
  await adminRegisterService(registerDto).then(() => {
    message.success('注册成功,可以登录了！', 3)
    showModal('login')
  })
}

// 登录、注册对话框显示控制
const showLogin = ref(false)
const showRegister = ref(false)
const showModal = (status) => {
  if (status === 'login') {
    showLogin.value = true
    showRegister.value = false
    return
  }
  showLogin.value = false
  showRegister.value = true
}
</script>

<template>
  <div class="login-page" :style="{ height: '100vh', width: '100vw' }">
    <a-layout>
      <!-- 顶部按钮 -->
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', background: 'transparent' }">
        <a-menu theme="light" mode="horizontal" :style="{ lineHeight: '64px', background: 'transparent' }">
          <a-menu-item>
            <a-button class="admin-btn" @click="showModal('login')" size="large">登录</a-button>
          </a-menu-item>
          <a-menu-item>
            <a-button class="admin-btn" @click="showModal('register')" size="large">注册</a-button>
          </a-menu-item>
          <a-menu-item>
            <a-button type="primary" size="large" @click="() => {router.push('/login')}">前往读者</a-button>
          </a-menu-item>
          <!-- 标题 -->
          <a-menu-item style="flex-grow: 1; text-align: right">
            <h1 style="
                background: #0000;
                color: white;
                font-size: 35px;
                font-family: '华文行楷', serif;
              ">
              图书借阅管理系统
            </h1>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <!-- 登录对话框 -->
      <a-modal v-model:open="showLogin" title="登录" :confirm-loading="loading" @ok="login">
        <div :style="{ padding: '20px' }">
          <!-- 登录表单 -->
          <a-form :model="loginDto">
            <!-- 用户名 -->
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
              <a-input v-model:value="loginDto.username">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon"/>
                </template>
              </a-input>
            </a-form-item>
            <!-- 密码 -->
            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
              <a-input-password v-model:value="loginDto.password">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
      <!-- 注册对话框 -->
      <a-modal v-model:open="showRegister" title="注册" :confirm-loading="loading" @ok="register">
        <div :style="{ padding: '20px' }">
          <!-- 登录表单 -->
          <a-form :model="registerDto">
            <!-- 用户名 -->
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
              <a-input v-model:value="registerDto.username" allow-clear show-count :maxlength="10">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon"/>
                </template>
              </a-input>
            </a-form-item>
            <!-- 密码 -->
            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
              <a-input-password v-model:value="registerDto.password" allow-clear show-count :maxlength="10">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon"/>
                </template>
              </a-input-password>
            </a-form-item>
            <!-- 昵称 -->
            <a-form-item label="昵称">
              <a-input v-model:value="registerDto.nickname" allow-clear show-count :maxlength="16"/>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </a-layout>
  </div>
</template>

<style scoped>

.login-page {
  background-image: url('@/assets/bg.webp');
  background-size: cover;
}

.admin-btn {
  background: #ff922b;
  color: white;
}
</style>
