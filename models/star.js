// import {
//       HTTP
// } from '../utils/http.js'
import {
      HTTP
} from "../utils/http-p.js"
class StarModel extends HTTP {
      // art_id: 点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号
      // type：点赞类型分为四种：100 电影 200 音乐 300 句子 400 书籍
      // like(behavior, artID, category) {
      //       let url = behavior == 'like' ? 'like' : 'like/cancel'
      //       this.request({
      //             url,
      //             method: 'POST',
      //             data: {
      //                   art_id: artID,
      //                   type: category
      //             }
      //       })
      // }
      //获取热搜关键字
      like(behavior, artID, category) {
            let url = behavior == 'like' ? 'like' : 'like/cancel'
            return this.request({
                  url,
                  method: 'POST',
                  data:{
                        art_id: artID,
                        type: category
                  }
            })
      }
      getClassicLikeStatus(artID, category) {
            return this.request({
                  url: `classic/${category}/${artID}/favor`
            })
      }
}
export {
      StarModel
}