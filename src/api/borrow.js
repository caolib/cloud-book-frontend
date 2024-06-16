import request from "@/utils/request";

// 查询个人的借书记录
const getBorrowByReaderIdService = function () {
    return request.get('/borrow');
};

/**
 * 借书
 * @param isbn 书号
 * @param borrowDate 借书日期
 * @param dueDate 归还日期
 */
const borrowService2 = function (isbn, borrowDate, dueDate) {
    return request.get('/borrow/borrow2', {
        params: {
            isbn: isbn,
            borrowDate: borrowDate,
            dueDate: dueDate
        }
    });
};


/**
 * 归还书籍
 * @param id 借阅号
 * @param isbn 书号
 */
const returnBookService = function (id, isbn) {
    console.log(id);
    return request.get('/borrow/returnBook', {
        params: {
            id: id,
            isbn: isbn
        }
    });
};

/**
 * 删除借阅记录
 * @param id 借阅号
 */
const deleteByIdService = function (id) {
    return request.delete('/borrow', {
        params: {id: id},
    });
};

/**
 * 批量删除借阅记录
 * @param ids 借阅号数组
 */
const deleteBorrowBatchService = function (ids) {
    return request.post('/borrow/batch', ids);
};

/**
 * 借书 已废弃(只有归还日期，借阅日期默认为当前日期)
 */
const borrowService = function (isbn, dueDate) {
    return request.get('/borrow/borrowBook', {
        params: {
            isbn: isbn,
            dueDate: dueDate
        }
    });
};

export {
    getBorrowByReaderIdService,
    borrowService,
    borrowService2,
    returnBookService,
    deleteByIdService,
    deleteBorrowBatchService
};