// pages/book/book.js
import {
      BookModel
} from '../../models/book.js'
let bookModel = new BookModel()
Page({

      /**
       * 页面的初始数据
       */
      data: {
            bookData: null,
            searchOrNo: false,
            more:Number,
            // 纯粹callback 回掉地狱 剥夺reture权利
            //promise 代码风格： 多个异步等待合并
            // async await es2017 小程序暂不支持

      },

      /**
       * 生命周期函数--监听页面加载
       */
      getCancel(){
            this.setData({
                  searchOrNo: false
            })
      },
      onSearch() {
            this.setData({
                  searchOrNo: true
            })
      },
      onLoad: function(options) {
            bookModel.getHotList().then(res => {
                  this.setData({
                        bookData: res
                  })
            })
      },
      onReachBottom(){
            this.setData({
                  more:Math.random()
            })
      }
})