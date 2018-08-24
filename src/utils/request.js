import Fly from 'flyio/dist/npm/wx'
// import qs from 'qs'
const fly = new Fly()

// 定义公共headers
fly.config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
fly.config.baseURL = 'https://n.luzai.com/api/'
fly.config.timeout = 5000
// 添加请求拦截器
fly.interceptors.request.use(request => {
  // 打印出请求体
  // 在发送请求之前做些什么
  if (request.showLoading) {
    wx.showLoading({ title: '加载中' })
  }
  // request.body.data = JSON.stringify(request.body.data)
  request.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // 终止请求
  // var err=new Error("xxx")
  // err.request=request
  // return Promise.reject(new Error(""))

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  // 将request作为promise的最终值
  return Promise.resolve(request)
})
// 添加响应拦截器
fly.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    if (response.request.showLoading) {
      setTimeout(function () {
        wx.hideLoading()
      }, 800)
    }
    return Promise.resolve(response)
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

class Request {
  createError = (code, resp) => {
    const err = new Error(resp.message)
    err.code = code
    return err
  }
  handleRequest = request => {
    return new Promise((resolve, reject) => {
      request
        .then(res => {
          const data = res.data
          if (!data) {
            return reject(this.createError(400, 'no data'))
          }
          resolve(data) // 异步操作成功时调用，并将异步操作的结果作为参数传递出去
        })
        .catch(err => {
          const resp = err.response
          console.log('---------------', resp)
          if (resp.statusText === 401) {
            reject(this.createError(401, 'need auth')) // 异步操作失败时调用，并将异步操作爆出的错误作为参数传递出去
          }
        })
    })
  }
  handleAll = request => {
    // promisory一个promise工厂
    let args = []
    for (let i = 0; i < request.length; i++) {
      args.push(`data${i}`)
    }
    return new Promise((resolve, reject) => {
      fly
        .all(request)
        .then(
          fly.spread((...args) => {
            resolve(args)
          })
        )
        .catch(err => {
          console.log(err)
          reject(this.createError(401, 'need auth'))
        })
    })
  }
  /**
   * GET类型的网络请求
   **/
  get (url, data) {
    // data是对象
    return this.handleRequest(
      fly.get(
        url,
        { data: data },
        {
          showLoading: true
        }
      )
    )
  }
  /**
   * POST类型的网络请求
   **/
  post (url, data) {
    // data是对象
    return this.handleRequest(
      fly.post(
        url,
        { data: data },
        {
          showLoading: true
        }
      )
    )
  }
  /**
   * DELETE类型的网络请求
   **/
  delete (url, data) {
    // data是对象
    return this.handleRequest(
      fly.delete(
        url,
        { data: data },
        {
          showLoading: true
        }
      )
    )
  }
}

export default Request
