import {
      HTTP
} from "../utils/http-p.js"   
class SearchModel extends HTTP {
      key = "q"
      maxLenght = 10
      constructor() {
            super()
      }
      //获取热搜关键字
      getHotKeyword() {
            return this.request({
                  url: '/book/hot_keyword'
            })
      }
      //获取历史搜索
      getHistory() {
            return wx.getStorageSync(this.key) ? wx.getStorageSync(this.key) : []
      }
      addToHistory(keyword) {
            let words = this.getHistory()
            const has = words.includes(keyword)
            if (!has) {
                  if (words.length >= this.maxLenght) {
                        words.pop()
                  }
                  words.unshift(keyword)
                  wx.setStorageSync(this.key, words)
            }

      }
}
export {
      SearchModel
}