import request from "@/utils/request.js";
import {message} from "ant-design-vue";
import router from "@/router/index.js";
import {useReaderStore} from "@/stores/reader.js";

// 用户退出登录
const logoutService = async function () {
    const readerStore = useReaderStore();
    // 调用后端接口清除redis中的令牌
    const result = await request.delete('/logout');
    // 清除用户信息
    readerStore.clearReader();
    await router.push("/login");
    message.success("已退出登录!")
    return result;
}

export {logoutService}

