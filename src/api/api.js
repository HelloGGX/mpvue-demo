import Request from 'utils/request'

const request = new Request()

export default {
  getIndexData (data) {
    // 查询所有首页数据
    return request.get('getIndex.php', data)
  },
  getDetailData (data) {
    // 获取详情页的数据
    return request.get('getprod.php', data)
  },
  getSessionId (data) {
    // 向服务器发送登陆成功时的code
    return request.post('sessionId.php', data)
  },
  checkUser (data) {
    // 校验用户数据完整性
    return request.post('checkUser.php', data)
  },
  checkLogin (data) {
    // 校验登陆数据安全
    return request.post('checkLogin.php', data)
  },
  postGoodId (data) {
    // 点击日历返回价格
    let dat = JSON.stringify(data)
    return request.post('postGoodId.php', dat)
  },
  postApptData (data) {
    // 提交预约表单
    let dat = JSON.stringify(data)
    return request.post('postApptData.php', dat)
  },
  getOrdersData (data) {
    // 获取订单数据
    return request.get('getOrdersData.php', data)
  },
  postPhoneNum (data) {
    // 发送加密手机号
    let dat = JSON.stringify(data)
    return request.post('postPhoneNum.php', dat)
  },
  search (data) {
    // 搜索
    let dat = JSON.stringify(data)
    return request.post('search.php', dat)
  }
}
