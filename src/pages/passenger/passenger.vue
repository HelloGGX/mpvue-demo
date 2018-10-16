<!-- 添加出行人表单 -->
<template>
  <div>
    <form @submit="formSubmit" bindreset="formReset">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input input-wrap">
          <div class="weui-cell__hd">
            <div class="weui-label">
              中文姓名
            </div>
          </div>
          <div class="weui-cell__bd">
            <input type="text" placeholder="请输入姓名（例：张三）" name="name" v-model.trim="name" maxlength="10" class="contact-input weui-input">
          </div>
        </div>
        <div class="line"></div>
        <a class="weui-cell weui-cell_access input-wrap" @click="showActSheet()">
          <div class="weui-cell__hd">
            <div class="weui-label">
              证件类型
            </div>
          </div>
          <div class="weui-cell__bd">
            <input type="text" placeholder="请选择证件类型" disabled="true" name="cred_type" v-model.trim="cred_type" class="contact-input weui-input">
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </a>
        <div class="weui-cell weui-cell_input input-wrap">
          <div class="weui-cell__hd">
            <div class="weui-label">
              证件号码
            </div>
          </div>
          <div class="weui-cell__bd">
            <input type="text" placeholder="请输入证件号码" name="cred_num" v-model.number.trim="cred_num" class="contact-input weui-input">
          </div>
        </div>
      </div>
      <div class="root passenger-form-buttonBlock">
        <div class="mod-delete-container" v-show="isEdit" @click="deletePassager()">
          <div class="mod-delete-btn">删除</div>
        </div>
        <div class="submit-container">
          <button class="submit-btn" formType="submit">保存</button>
          <div class="submit-confirm-text">
            <p :class="['title', {'title-choice':isRead}]" @click="read">
              阅读并同意以下内容
            </p>
            <p>
              根据旅游法的相关要求，购买旅行度假商品需提供出行人的身份证件信息，并需在服务中出具对应身份证件用于验证，请确保录入信息真实有效。游地球将通过加密等方式保护您录入的身份证件信息，且仅在具体交易中授权提供给与您进行交易的商户及相关服务提供方。
            </p>
          </div>
        </div>
      </div>
    </form>
    <i-action-sheet :visible="visible" :actions="actions" show-cancel @cancel="cancel" @clickItem="clickItem"></i-action-sheet>
    <mptoast></mptoast>
  </div>
</template>

<script type='text/ecmascript-6'>
import api from 'api/api'
import { mapGetters } from 'vuex'
import Mptoast from 'mptoast'
export default {
  data () {
    return {
      id: '',
      name: '',
      cred_type: '',
      cred_num: '',
      visible: false,
      actions: [
        { name: '身份证' },
        { name: '护照' },
        { name: '现役军官证' },
        { name: '现役士官证' },
        { name: '现役士兵证' }
      ],
      isRead: true,
      isEdit: false
    }
  },
  components: {
    Mptoast
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.$root.$mp.query.name) {
        // 如果是编辑模式
        this.id = this.$root.$mp.query.id
        this.name = this.$root.$mp.query.name
        this.cred_type = this.$root.$mp.query.cred_type
        this.cred_num = this.$root.$mp.query.cred_num
        this.isEdit = true
      } else {
        // 如果是添加模式
        this.id = ''
        this.name = ''
        this.cred_type = ''
        this.cred_num = ''
        this.isEdit = false
      }
    },
    showActSheet () {
      this.visible = true
    },
    cancel () {
      this.visible = false
    },
    clickItem (i) {
      this.cred_type = this.actions[i.mp.detail.index].name
      this.cancel()
    },
    read () {
      this.isRead = !this.isRead
    },
    formSubmit (e) {
      if (!this.isRead) {
        this.$mptoast({
          text: '请阅读并同意下方授权内容',
          icon: 'info',
          duration: 2000
        })
      } else if (this.name === '') {
        this.$mptoast({
          text: '必填字段中中文姓名为空',
          icon: 'info',
          duration: 2000
        })
      } else if (this.cred_num === '') {
        this.$mptoast({
          text: '必填字段证件号码未填写',
          icon: 'info',
          duration: 2000
        })
      } else {
        api
          .postPassager({
            oid: this.oid,
            formData: e.mp.detail.value,
            perId: this.id,
            isEdit: this.isEdit ? 'isEdit' : 'isAdd'
          })
          .then(res => {
            if (res.state === 'ok') {
              this.$mptoast({
                text: this.isEdit ? '编辑成功' : '添加成功',
                icon: 'success',
                duration: 3000
              })
              wx.navigateBack()
            }
          })
          .catch(errMsg => {
            this.$mptoast({
              text: errMsg,
              icon: 'error',
              duration: 2000
            })
          })
      }
    },
    deletePassager () {
      api
        .deletePassager({ oid: this.oid, perId: this.id })
        .then(res => {
          if (res.state === 'ok') {
            this.$mptoast({
              text: '删除成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1
            })
          }
        })
        .catch(errMsg => {
          this.$mptoast({
            text: errMsg,
            icon: 'error',
            duration: 2000
          })
        })
    }
  },
  computed: {
    ...mapGetters(['oid'])
  }
}
</script>
<style lang='less' scoped>
.input-wrap {
  font-size: 14px;
  color: #333;
  input {
    font-size: 14px;
    width: 100%;
    color: #666;
  }
}
.passenger-form .root {
  margin-bottom: 12px;
  position: relative;
  &:last-child {
    background-color: #fff;
  }
}
.submit-container {
  padding: 12px;
  background-color: #f2f3f4;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .submit-btn {
    display: inline-block;
    box-sizing: border-box;
    padding: 0 6px;
    height: 30px;
    border: 0 none;
    border-radius: 3px;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    line-height: 30px;
    transition: background 1s ease;
    -webkit-appearance: none;
    outline: none;
  }
  .submit-btn {
    height: 44px;
    background: #ffc900;
    color: #3d3d3d;
    line-height: 44px;
    width: 100%;
    font-size: 18px;
  }
  .submit-confirm-text {
    margin-top: 20px;
    font-size: 13px;
    line-height: 20px;
    color: #a5a5a5;
    .title {
      padding-left: 21px;
      background-image: url('../../../static/img/icon/circle.png');
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: left 2px;
    }
    .title-choice {
      background-image: url('../../../static/img/icon/circle_fill.png');
    }
  }
}
.mod-delete-container {
  padding: 12px;
  background-color: #f2f3f4;
}
.mod-delete-btn {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 6px;
  height: 30px;
  border: 0 none;
  border-radius: 3px;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  line-height: 30px;
  transition: background 1s ease;
  -webkit-appearance: none;
  outline: none;
}
.mod-delete-btn {
  position: relative;
  height: 44px;
  background: #fff;
  color: #666;
  line-height: 44px;
  width: 100%;
  font-size: 18px;
  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    pointer-events: none;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
}
</style>