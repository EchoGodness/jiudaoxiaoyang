import {
      HTTP
} from "../utils/http-p.js"

class MyModel extends HTTP {
      constructor() {
            super()
      }
      getFavor() {
            return this.request({
                  url: '/classic/favor'
            })
      }
      // 获取喜欢书籍数量
      getFavorCount() {
            return this.request({
                  url: '/book/favor/count'
            })
      }
}

export {
      MyModel
}