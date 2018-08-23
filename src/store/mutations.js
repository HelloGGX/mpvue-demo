import * as types from './mutation-types'

const mutations = {
  [types.SET_CALENDAR_LIST] (state, calendarList) {
    state.calendarList = calendarList
  },
  [types.SET_NICKNAME] (state, nickName) {
    state.nickName = nickName
  },
  [types.SET_OID] (state, oid) {
    state.oid = oid
  },
  [types.SET_AVATARURL] (state, avatarUrl) {
    state.avatarUrl = avatarUrl
  },
  [types.SET_CANIUSE] (state, canIUse) {
    state.canIUse = canIUse
  },
  [types.SET_VISIBLE] (state, visible) {
    state.visible = visible
  },
  [types.SET_AUTHPHONE] (state, authPhone) {
    state.visible = authPhone
  }
}

export default mutations
