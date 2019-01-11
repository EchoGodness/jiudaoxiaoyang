import {
      HTTP
} from "../utils/http-p.js"

class ClassicModel extends HTTP {
      constructor() {
            super()
      }
      /* 获取最新的期刊 */
      getLatest() {
            return this.request({
                  url: 'classic/latest',
                  success: res => {
                        wx.setStorageSync(this._getKey(res.index), res)
                  }
            })
      }
      getClassic(index, nextOrPrevious, sCallback) {
            // 缓存中寻找or API 写入存储
            // key 确定key
            let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
            let classic = wx.getStorageSync(key) //缓存中寻找
            if (!classic) {
                  this.request({
                        url: `classic/${index}/${nextOrPrevious}`,
                        success: res => {
                              wx.setStorageSync(this._getKey(res.index), res) // 保存：
                              sCallback(res)
                        }
                  })
            } else {
                  sCallback(classic)
            }
      }
      // 获取某一期详细信息
      getClassicDetail(type,id) {
            /* this.request() 是 async, 不能 return 结果 */
            return this.request({
                  url: `classic/${type}/${id}`
            })
      }
      // 存储最新latest 下表
      _setLatestIndex(index) {
            wx.setStorageSync('latest', index) // 同步写入缓存
      }
      // 存储最新latest 下表
      _getLatestIndex() {
            return wx.getStorageSync('latest') // 同步写入缓存
      }
      _getKey(index) {
            return `classic-${index}`
      }
}
export {
      ClassicModel
}