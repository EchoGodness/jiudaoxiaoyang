// pages/my/my.js
import {
      MyModel
} from '../../models/my.js'
let myModel = new MyModel()
Page({

      /**
       * 页面的初始数据
       */
      properties: {

      },
      data: {
            classic: [],
            count: null,
            userInfo: null
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            let classic = myModel.getFavor()
            let count = myModel.getFavorCount()
            Promise.all([classic, count]).then(res => {
                  this.setData({
                        classic: res[0],
                        count: res[1].count
                  })
            })
            this.userAuthorize()
      },
      getUserInfo(e) {
            let userInfo = e.detail.userInfo ? e.detail.userInfo : null
            this.setData({
                  userInfo
            })
      },
      // 判断用户是否授权：
      userAuthorize() {
            wx.getSetting({
                  success: ({
                        authSetting
                  }) => {
                        if (authSetting['scope.userInfo']) {
                              wx.getUserInfo({
                                    success: ({
                                          userInfo
                                    }) => {
                                          this.setData({
                                                userInfo
                                          })
                                    }
                              })
                        }
                  }
            })
      },
      onPreviewTap: function(event) {
            wx.navigateTo({
                  url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
            })
      },
      // 调到另外一个页面
      onJumpToAbout(event) {
            wx.navigateTo({
                  url: './../about/about'
            })
      },
      onStudy(event) {
            wx.navigateTo({
                  url: './../course/course'
            })
      }
})