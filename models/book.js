import {
      HTTP
} from "../utils/http-p.js"

class BookModel extends HTTP {

      getHotList() {
            return this.request({
                  url: 'book/hot_list'
            })
      }
      // 获取书籍详细信息
      getBookDetails(id) {
            return this.request({
                  url: `book/${id}/detail`
            })
      }
      // 获取书籍点赞情况
      getBookFavor(id) {
            return this.request({
                  url: `book/${id}/favor`
            })
      }
      // 获取书籍短评
      getBookComment(id) {
            return this.request({
                  url: `book/${id}/short_comment`
            })
      }
      // 新增短评
      addShortComment(book_id, content) {
            return this.request({
                  url: `book/add/short_comment`,
                  method:'POST',
                  data:{
                        book_id,
                        content
                  }
            })
      }
      // 书籍搜索
      getSearch(start, q) {
            return this.request({
                  url: '/book/search?summary=1',
                  data: {
                        start, q
                  }
            })
      }
      getMyBookCount() {
            return this.request({
                  url: 'book/favor/count'
            })
      }
}
export {
      BookModel
}