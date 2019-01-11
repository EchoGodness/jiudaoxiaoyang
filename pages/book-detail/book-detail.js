// pages/book-detail/book-detail.js
import {
      BookModel
} from '../../models/book.js'
import {
      StarModel
} from '../../models/star.js'
let bookModel = new BookModel()
let starModel = new StarModel()
Page({

      /**
       * 页面的初始数据
       */
      data: {
            comments: [],
            details: null,
            like_status: false,
            fav_nums: null,
            showMask: false

      },

      /**
       * 生命周期函数--监听页面加载
       */
      showInput() {
            this.changeShowStatus(true)
      },
      onCancel() {
            this.changeShowStatus(false)
      },
      changeShowStatus(val) {
            this.setData({
                  showMask: val
            })
      },
      onPost(events) {
            const comment = events.detail || events.detail.value
            if (comment.lenght > 12) {
                  wx.showToast({
                        title: '短评最多12个字',
                        icon: 'none'
                  })
                  return
            }
            bookModel.addShortComment(this.data.details.id, comment).then(res => {
                  wx.showToast({
                        title: '+1',
                        icon: 'none'
                  })
                  this.data.comments.unshift({
                        content: comment,
                        nums: 1
                  })
                  this.setData({
                        comments: this.data.comments,
                        showMask: false
                  })
            })
      },
      getLike: function(events) {
            let id = this.data.details.id
            starModel.like(events.detail.behavior, id, 400)
      },
      onLoad: function(options) {
            wx.showLoading()
            const details = bookModel.getBookDetails(options.bid)
            const comments = bookModel.getBookComment(options.bid)
            const likeStatus = bookModel.getBookFavor(options.bid)
            Promise.all([details, comments, likeStatus]).then(res => {
                  this.setData({
                        details: res[0],
                        comments: res[1].comments,
                        like_status: res[2].like_status,
                        fav_nums: res[2].fav_nums,
                  })
                  wx.hideLoading()
            })
      },

})