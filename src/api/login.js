import request from "@/utils/request";

/**
 * 读者登录
 * @param reader 读者信息 {username, password}
 */
const loginService = function (reader) {
    return request.post('/reader/login', reader);
};

/**
 * 管理员登录
 * @param admin 管理员信息 {username, password}
 */
const adminLoginService = function (admin) {
    return request.post('/admin/login', admin);
}

export {loginService, adminLoginService};