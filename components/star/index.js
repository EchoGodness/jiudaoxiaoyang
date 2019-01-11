// components/like/index.js
Component({
      /**
       * 组件的属性列表
       */
      properties: {
            like: {
                  type: Boolean, //类型（必填
                  value: false, //默认false
            },
            count: {
                  type: Number,
            },
            readOnly:{
                  type:Boolean,
                  value:false
            }
      },

      /**
       * 组件的初始数据
       */
      data: {
            yesSrc: '../star/images/like.png',
            noSrc: '../star/images/like@dis.png'
      },

      /**
       * 组件的方法列表
       */
      methods: {
            onLike() {
                  if (this.properties.readOnly){
                        return
                  }
                  // 自定义事件 
                  let like = this.properties.like
                  let count = this.properties.count
                  count = like ? count - 1 : count + 1;
                  this.setData({
                        count: count,
                        like: !like,
                  })
                  // 告知点赞还是取消点赞
                  let behavior = this.properties.like ? 'like' : 'cancel'
                  // 激活自定义事件 triggerEvent('like',{},{})
                  this.triggerEvent('like', {
                        behavior
                  }, {})
            }
      }
})