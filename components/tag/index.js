// components/tag/index.js
Component({
      /**
       * 组件的属性列表
       */
      options:{
            multipleSlots:true            //多插槽启用slot
      },
      externalClasses:['tag-class'],                 //外部样式类
      properties: {
            content:String,
            num:Number
      },

      /**
       * 组件的初始数据
       */
      data: {

      },

      /**
       * 组件的方法列表
       */
      methods: {
            onTap(){
                  this.triggerEvent('tapping', this.properties.content)
            }
      }
})
