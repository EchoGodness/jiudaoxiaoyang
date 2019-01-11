// components/preview/index.js
Component({
      /**
       * 组件的属性列表
       */
      properties: {
            classic: {
                  type: Object,
                  observer: function(newVal) {
                        if (newVal) {
                              var typeText = {
                                    100: "电影",
                                    200: "音乐",
                                    300: "句子"
                              }[newVal.type]
                        }
                        this.setData({
                              typeText: typeText
                        })
                  }
            }
      },
      data: {
            typeText: String
      },

      /**
       * 组件的方法列表
       */
      attached() {

      },
      methods: {
            onTab(event) {
                  wx.navigateTo({
                        url: `/pages/classic-detail/classic-detail?bid=${event.currentTarget.dataset.bid}&&btype=${event.currentTarget.dataset.btype}`,
                  })
            }
      }
})