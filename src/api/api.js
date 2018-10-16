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
  getOrderDetail (data) {
    // 获取订单数据
    return request.get('getOrderDetail.php', data)
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
  getSearchClass (data) {
    // 获取搜索页面分类的数据
    return request.get('getSearchClass.php', data)
  },
  getChatData (data) {
    // 获取聊天的客服数据
    return request.get('getChatData.php', data)
  },
  getPay (data) {
    // 支付接口
    return request.post('getPay.php', data)
  },
  postPay (data) {
    // 支付成功后发送产品参数
    return request.post('postPay.php', data)
  },
  getSearchDetail (data) {
    // 获取搜索详情列表
    return request.get('getSearchDetail.php', data)
  },

  getOldPassager (data) {
    // 获取已经填写过的游客信息
    return request.get('getOldPassager.php', data)
  },
  postPassager (data) {
    // 获取已经填写过的游客信息
    return request.post('postPassager.php', data)
  },
  deletePassager (data) {
    // 删除出行人信息
    return request.post('deletePassager.php', data)
  },
  postFilter (data) {
    // 发送筛选信息
    return request.post('postFilter.php', data)
  },
  postClassify (data) {
    // 发送排序及相关信息
    return request.post('postClassify.php', data)
  },
  getShareInfo (data) {
    // 获取分享openid
    console.log(data)
    return request.get('getShareInfo.php', data)
  }
}
