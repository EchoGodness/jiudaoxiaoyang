// components/navi/index.js
Component({
      /**
       * 组件的属性列表
       */
      properties: {
            title: String,
            latest: Boolean, //最后
            first: Boolean
      },

      /**
       * 组件的初始数据
       */
      data: {
            disLeft: '../../components/navi/images/triangle.dis@left.png',
            disRight: '../../components/navi/images/triangle.dis@right.png',
            left: '../../components/navi/images/triangle@left.png',
            right: '../../components/navi/images/triangle@right.png',
      },

      /**
       * 组件的方法列表
       */
      methods: {
            onLeft() {
                  if (!this.properties.latest) {
                        this.triggerEvent('left', {})
                  }
            },
            onRight() {
                  if (!this.properties.first) {
                        this.triggerEvent('right', {})
                  }
            }
      }
})