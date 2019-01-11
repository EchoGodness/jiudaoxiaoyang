import {
      ClassicModel
} from '../../models/classic.js'
import {
      StarModel
} from '../../models/star.js'
let classicModel = new ClassicModel()
let starModel = new StarModel()
Page({
      /**
       * 页面的初始数据
       */
      data: {
            fav_nums: null, //点赞人数
            like_status: null, //喜欢or不喜欢
            classicData: null, //数据
            latest: true, //最新一期
            first: false, //第一期
            latestIndex: null, //最新一期下标
      },
      onLoad: function(options) {
            classicModel.getLatest().then(res=>{
                  this.setData({
                        classicData: res,
                        latestIndex: res.index,
                        fav_nums: res.fav_nums, //点赞人数
                        like_status: res.like_status, //喜欢or不喜欢
                  })
            })
      },
      getLike: function(events) {
            let {
                  id,
                  type
            } = this.data.classicData
            starModel.like(events.detail.behavior, id, type)
      },
      getPrevious: function(events) {
            this._updataClassic('previous')
      },
      getNext: function(events) {
            this._updataClassic('next')
      },
      _updataClassic: function(nextOrPrevious) {
            let index = this.data.classicData.index
            classicModel.getClassic(index, nextOrPrevious, (res) => {
                  let latestIndex = this.data.latestIndex
                  this.setData({
                        classicData: res,
                        latest: latestIndex == res.index ? true : false,
                        first: res.index == 1 ? true : false,
                  })
                  let {
                        id,
                        type
                  } = this.data.classicData
                  this._getLikeStatus(id, type)
            })
      },
      _getLikeStatus(artID, category) {
            starModel.getClassicLikeStatus(artID, category).then(res=>{
                  this.setData({
                        fav_nums: res.fav_nums, //点赞人数
                        like_status: res.like_status, //喜欢or不喜欢
                  })
            })
      }


})