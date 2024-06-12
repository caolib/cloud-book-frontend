<script setup>
import {reactive, computed} from "vue";
import {UserOutlined, LockOutlined} from "@ant-design/icons-vue";
import {loginService} from "@/api/login";
import {message} from "ant-design-vue";
import {useReaderStore} from "@/stores/reader";
import router from "@/router";

const readerStore = useReaderStore();

// 返回的用户信息
let returnReader = reactive({
  id: "",
  username: "",
  nickname: "",
  gender: "",
  age: "",
  tel: "",
  token: "",
});

const loginDto = reactive({
  username: "",
  password: "",
});

const login = async function () {
  // todo 显示加载中动画

  loginService(loginDto).then(async (res) => {
    returnReader = res.data;
    message.success("用户 " + res.data.nickname + " 登录成功!", 3);
    // 保存用户信息和token
    readerStore.setReader(returnReader);
    console.log("returnReader:" + returnReader.token);
    await router.push("/home");
    location.reload();
  });

  // 显示加载中动画
  // const loading = ElLoading.service({
  //   lock: true,
  //   text: '长时间加载请刷新页面......',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // })

  // const result = await loginService(loginDto.value);
  // returnReader = result.data;

  // console.log(returnReader);

  //保存用户信息和token
  // readerStore.setReader(returnReader);
  // tokenStore.setToken(returnReader.token);
  // adminStore.setIsAdmin(false);

  // 关闭动画
  // loading.close();

  // console.log("tokenStore:" + tokenStore.token);

  // await router.push("/book");
  // ElNotification.success({
  //   title: "登录成功",
  //   message: "Hello," + returnReader.nickname,
  //   duration: 1500,
  // });
};


const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// const disabled = computed(() => {
//   return !(formState.username && formState.password);
// });

const disabled = computed(() => {
  return !(loginDto.username && loginDto.password);
});
</script>

<template>
  <div class="center">
    <!-- 登录表单 -->
    <a-form
        :model="loginDto"
        name="login-form"
        class="login-form"
        @finish="login"
        @finishFailed="onFinishFailed">
      <!-- 用户名 -->
      <a-form-item
          label="账号"
          name="username"
          :rules="[{ required: true, message: '输入用户名' }]"
      >
        <a-input v-model:value="loginDto.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon"/>
          </template>
        </a-input>
      </a-form-item>

      <!-- 密码 -->
      <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="loginDto.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon"/>
          </template>
        </a-input-password>
      </a-form-item>

      <!-- 登录按钮 -->
      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">登录</a-button>
        <a-button :disabled="disabled" style="margin-left: 20px">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  background-color: rgba(98, 98, 98, 0.07);
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 500px;
  border-radius: 50px;
}
</style>
