import {
      SearchModel
} from '../../models/search.js'
import {
      BookModel
} from '../../models/book.js'
let searchModel = new SearchModel()
let bookModel = new BookModel()
Component({
      /**
       * 组件的属性列表
       */
      properties: {
            more: {
                  type: Number,
                  observer: 'loadMore'
            }
      },

      /**
       * 组件的初始数据
       */
      data: {
            history: searchModel.getHistory(),
            hot: [],
            books: [],
            searchIng: false,
            q: null,
            loading: false,
            totalRecord: null,
            loadingCenter: false,
      },

      /**
       * 组件的方法列表
       */
      attached() {
            searchModel.getHotKeyword().then(({
                  hot
            }) => {
                  this.setData({
                        hot
                  })
            })
      },
      methods: {
            // 加载更多
            loadMore() {
                  let {
                        books,
                        q,
                        loading,
                        totalRecord
                  } = this.data
                  if (q) {
                        if (!loading) {
                              const start = books.length;
                              this._changeLoading(true)
                              if (totalRecord != start) {
                                    bookModel.getSearch(start, q).then(res => {
                                          const newArray = books.concat(res.books)
                                          this.setData({
                                                books: newArray,
                                                loadingCenter: false
                                          })
                                          this._changeLoading(false)
                                    }, () => {
                                          this._changeLoading(false)
                                    })
                              } else {
                                    this._changeLoading(false)
                              }
                        }
                  }
            },
            onCancel() {
                  this.triggerEvent('cancel')
                  this._initialize()
            },
            onDelect() {
                  this.changeSearchStatus()
                  this._initialize()
            },
            onConfirm(events) {
                  this._changeLoadingCenter()
                  this.changeSearchStatus()
                  const q = events.detail || events.detail.value
                  bookModel.getSearch(0, q).then(({
                        books,
                        total
                  }) => {
                        this._changeLoadingCenter()
                        searchModel.addToHistory(q)
                        this.setData({
                              books,
                              totalRecord: total,
                              q
                        })
                  })
            },
            changeSearchStatus() {
                  this.setData({
                        searchIng: this.data.searchIng ? false : true
                  })
            },
            _changeLoadingCenter() {
                  this.setData({
                        loadingCenter: this.data.loadingCenter ? false : true
                  })
            },
            _changeLoading(val) {
                  this.setData({
                        loading: Boolean(val)
                  })
            },
            _initialize() {
                  this.setData({
                        books: [],
                        totalRecord: null,
                        q: null
                  })
            }
      }
})