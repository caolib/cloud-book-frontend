import request from "@/utils/request";

// 查询个人的借书记录
const getBorrowByReaderIdService = function () {
    return request.get('/borrow');
};

//借书
const borrowService = function (isbn, dueDate) {
    return request.get('/borrow/borrowBook', {
        params: {
            isbn: isbn,
            dueDate: dueDate
        }
    });
};

const borrowService2 = function (isbn, borrowDate,dueDate) {
    return request.get('/borrow/borrow2', {
        params: {
            isbn: isbn,
            borrowDate:borrowDate,
            dueDate: dueDate
        }
    });
};
// 还书
const returnBookService = function (id, isbn) {
    console.log(id);
    return request.get('/borrow/returnBook', {
        params: {
            id: id,
            isbn: isbn
        }
    });
};

// 删除借书记录
const deleteByIdService = function (id) {
    return request.delete('/borrow', {
        params: {id: id},
    });
};

//批量删除借阅记录
const deleteBorrowBatchService = function (ids) {
    return request.post('/borrow/batch', ids);
};

export {
    getBorrowByReaderIdService,
    borrowService,
    borrowService2,
    returnBookService,
    deleteByIdService,
    deleteBorrowBatchService
};