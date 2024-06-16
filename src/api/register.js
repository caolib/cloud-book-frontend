import request from "@/utils/request";

/**
 * 读者注册
 * @param reader 读者信息 {username,password,gender,age,tel,nickname}
 */
const registerService = function (reader) {
    return request.post('/reader/register',reader);
};

/**
 * 管理员注册
 * @param admin 管理员信息 {username,password,nickname}
 */
const adminRegisterService = (admin)=>{
    return request.post('/admin/register',admin)
}

export {registerService,adminRegisterService};