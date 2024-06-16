import request from "@/utils/request";


/**
 * 更新管理员信息
 * @param admin 管理员信息,根据id更新密码和昵称信息
 */
const updateAdminService = function (admin) {
    return request.put('/admin/update',admin);
};

export {updateAdminService};