import request from "@/utils/request";
// 读者注册
const registerService = function (reader) {
    return request.post('/reader/register',reader);
};

// 管理员注册
const adminRegisterService = (admin)=>{
    return request.post('/admin/register',admin)
}

export {registerService,adminRegisterService};