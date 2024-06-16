import request from "@/utils/request";

/**
 * 查询书籍信息
 * @param condition 查询条件 {bookName, author, isbn, currentPage, pageSize}
 */
const getAllBookService = function (condition) {
    console.log('搜索条件:' + JSON.stringify(condition));
    return request.post("/book", condition);
};

/**
 * 添加书籍
 * @param book 书籍信息 {isbn, title, cover, introduction, number, author}
 */
const addBookService = (book) => {
    return request.post("/book/add", book);
}

/**
 * 删除书籍
 * @param isbn 书号
 */
const deleteBookService = (isbn) => {
    return request.delete("/book/" + isbn);
}

/**
 * 更新书籍信息
 * @param book 书籍信息 {isbn, title, cover, introduction, number, author}
 */
const updateBookService = (book) => {
    return request.put("/book", book)
}

export {getAllBookService, addBookService, deleteBookService, updateBookService};
