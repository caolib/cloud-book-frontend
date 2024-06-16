import request from "@/utils/request";

/**
 * 更新读者信息
 * @param reader 读者信息 {id,password,nickname,gender,age,tel}
 */
const updateReaderService = function (reader) {
    return request.post('/reader/update', reader);
};

/**
 * 查询读者信息
 * @param condition 查询条件 {username,nickname,tel}
 */
const getAllReaderService = (condition) => {
    return request.post('/reader', condition);
}


/**
 * 删除读者
 * @param id 读者id
 */
const deleteReaderService = (id) => {
    return request.delete('/reader/' + id);
}
export {
    updateReaderService,
    getAllReaderService,
    deleteReaderService
};