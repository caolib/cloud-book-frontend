import request from "@/utils/request";

// 条件分页查询
const getAllBookService = function (condition) {
    console.log('搜索条件:' + JSON.stringify(condition));
    return request.post("/book", condition);
};

// 添加书籍
const addBookService = (book) => {
    return request.post("/book/add", book);
}

// 删除书籍
const deleteBookService = (isbn) => {
    return request.delete("/book/" + isbn);
}

// 更新书籍信息
const updateBookService = (book) => {
    return request.put("/book", book)
}

export {getAllBookService, addBookService, deleteBookService, updateBookService};
