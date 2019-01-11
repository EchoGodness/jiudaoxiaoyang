import {
      classicBeh
} from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
      /**
       * 组件的属性列表
       */
      behaviors: [classicBeh],
      properties: {
            musicSrc: String
      },

      /**
       * 组件的初始数据
       */
      data: {
            playOrPause: false, //默认不播放
            play: '../music/images/player@waitting.png',
            pause: '../music/images/player@playing.png',
      },
      /**
       * 组件的方法列表
       */
      methods: {
            onPlay() {
                  let {
                        playOrPause
                  } = this.data
                  if (!playOrPause) {
                        this.setData({
                              playOrPause: true
                        })
                        mMgr.title = this.properties.content;
                        mMgr.src = this.properties.musicSrc;
                  } else {
                        this.setData({
                              playOrPause: false
                        })
                        mMgr.pause()
                  }
            },
            _recoverStatus: function() {
                  if (mMgr.paused) {
                        this._setplayOrPause(false)
                        return
                  }
                  this._setplayOrPause(this.properties.musicSrc == mMgr.src ? true : false)
            },
            _setplayOrPause(val) {
                  this.setData({
                        playOrPause: val
                  })
            }
      },
      attached: function() {
            // 监听播放
            mMgr.onPlay(() => {
                  this._setplayOrPause(true)
            })
            // 监听停止
            mMgr.onPause(() => {
                  this._setplayOrPause(false)
            })
            // 监听关闭
            mMgr.onStop(() => {
                  this._setplayOrPause(false)
            })
            // 监听关闭
            mMgr.onEnded(() => {
                  this._setplayOrPause(false)
            })
            this._recoverStatus()
      },

})