const state = {
  // 状态管理
  calendarList: [], // 获取异步数据
  oid: '', // 用户openId
  nickName: '用户名', // 用户的昵称
  avatarUrl: '', // 用户的头像
  canIUse: false, // 是否授权(默认已授权)
  visible: false, // 根据是否授权展示模态框
  authPhone: false, // 是否授权手机号
  net: true // 默认联网
}

export default state
