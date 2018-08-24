import Request from 'utils/request'

const request = new Request()

export default {
  getIndexData (data) {
    // 查询所有首页数据
    return request.post('getIndex.php', data)
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
    return request.post('postGoodId.php', data)
  },
  postApptData (data) {
    // 提交预约表单
    return request.post('postApptData.php', data)
  },
  getOrdersData (data) {
    // 获取订单数据
    return request.get('getOrdersData.php', data)
  },
  getReservedData (data) {
    // 获取预约的数据
    return request.get('getReservedData.php', data)
  },
  cancelOrder (data) {
    // 取消订单
    return request.post('cancelOrder.php', data)
  },
  postPhoneNum (data) {
    // 发送加密手机号
    return request.post('postPhoneNum.php', data)
  },
  getKeyData (data) {
    return request.post('getKeyData.php', data)
  },
  getClass (data) {
    // 获取搜索页面分类的数据
    return request.get('getClass.php', data)
  },
  getChatData (data) {
    // 获取聊天的客服数据
    return request.get('getChatData.php', data)
  }
}
