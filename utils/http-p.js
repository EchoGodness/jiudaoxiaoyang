import {
      config
} from '../config.js'
const tips = {
      1: '抱歉，出现了一个错误',
      1005: 'appkey无效，请前往www.7yue.pro申请',
      3000: '期刊不存在'
}
export class HTTP {
      request({ url, data = {}, method='GET'}) {
            return new Promise((resolve, reject) => {
                  wx.request({
                        url: `${config.api_base_url}${url}`,
                        method,
                        data,
                        header: {
                              'content-typs': 'application/json',
                              'appkey': config.appkey
                        },
                        success: (res) => {
                              let code = res.statusCode.toString()
                              if (code.startsWith('2')) {
                                    resolve(res.data)
                              }else{
                                    reject()
                              }
                        },
                        fail: error => {
                              reject(error)
                        }
                  })
            })
      }
}