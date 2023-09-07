<template>
  <!-- modal:隐私授权弹窗-->
  <view v-if="show" class="modal-box" @click="disagreeHandle">
    <view class="dialog" @tap.stop="catchtap">
      <view class="title">隐私保护指引</view>
      <view class="content">
        在您使用当前小程序服务之前，请仔细阅读<view class="link" hover-class="hover" @click="openContract">{{ name }}</view>
        。如果您同意{{ name }}，请点击“同意”后再开始使用。
      </view>
      <view class="btn-box">
        <button class="btn disagree" hover-class="hover" @click="disagreePrivacy">拒绝</button>
        <button class="btn agree" hover-class="hover" @click="showReadTips" v-if="read && !isRead">同意</button>
        <button class="btn agree" hover-class="hover" id="agree-btn" open-type="agreePrivacyAuthorization"
          @agreeprivacyauthorization="agreePrivacy" v-else>同意</button>
      </view>
    </view>
  </view>
</template>

<script>
  import store from './store'

  export default {
    name: "mp-privacy",
    props: {
      action: {
        type: String,
        value: 'none', // exit | none
      },
      read: {
        type: Boolean,
        value: false, // 是否需要读后再同意
      },
    },
    data() {
      return {
        reading: false,
        show: false,
        isRead: false,
        name: ""
      };
    },
    computed: {
      showPrivacy() {
        return store.state.showPrivacy
      }
    },
    watch: {
      showPrivacy(newVal) {
        const _ = this
        if (newVal && wx.getPrivacySetting) {
          wx.getPrivacySetting({
            success(res) {
              if (res.errMsg == "getPrivacySetting:ok") {
                _.name = res.privacyContractName
                _.show = res.needAuthorization
              } else {
                console.info(res)
              }
            }
          })
        } else {
          _.show = false
        }
      },
    },
    destroyed: function() {
      this.disagreeHandle()
    },
    onPageHide() {
      this.disagreeHandle()
    },
    methods: {
      openContract() {
        const _ = this
        _.reading = true
        wx.openPrivacyContract({
          success: () => {
            _.isRead = true
          },
          fail: () => {
            _.isRead = false
          },
        })
      },
      showReadTips() {
        uni.showModal({
          title: '提示',
          content: '您必须先阅读隐私保护指引',
          showCancel: false
        })
      },
      disagreeHandle() {
        // 用户点击拒绝后，开发者调用 resolve({ event:'disagree' }) 告知平台用户已经拒绝
        store.commit('setShowPrivacy', false)
        if (store.state.resolvePrivacyAuthorization) {
          store.state.resolvePrivacyAuthorization({
            event: 'disagree'
          })
        }
      },
      disagreePrivacy() {
        this.disagreeHandle()
        if (this.action === 'exit') wx.exitMiniProgram()
      },
      agreePrivacy() {
        // 用户点击同意后，开发者调用 resolve({ buttonId: 'agree-btn', event: 'agree' })  告知平台用户已经同意，参数传同意按钮的id。为确保用户有同意的操作，基础库在 resolve 被调用后，会去检查对应的同意按钮有没有被点击过。检查通过后，相关隐私接口会继续调用
        if (store.state.resolvePrivacyAuthorization) {
          store.state.resolvePrivacyAuthorization({
            buttonId: 'agree-btn',
            event: 'agree'
          })
        }

        store.commit('setShowPrivacy', false)
      },
      catchtap() {}
    }
  }
</script>

<style scoped>
  .modal-box {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-box .dialog {
    width: 90%;
    padding: 40rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 16rpx;
  }

  .modal-box .title {
    text-align: center;
    color: #333;
    font-weight: bold;
    font-size: 34rpx;
  }

  .modal-box .content {
    display: block;
    font-size: 32rpx;
    color: #666;
    margin-top: 40rpx;
    text-align: justify;
    line-height: 1.6;
    padding: 10rpx 20rpx;
  }

  .modal-box .content .link {
    color: #19be6b;
    display: inline;
  }

  .modal-box .btn-box {
    margin-top: 50rpx;
    display: flex;
    text-align: center;
  }

  .modal-box .btn::after {
    border: none;
    display: none;
  }

  .modal-box .hover {
    opacity: 0.7;
  }

  .modal-box .btn-box .btn {
    width: 50%;
    height: 76rpx;
    line-height: 76rpx;
    margin: 0 10rpx;
    padding: 0;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    font-weight: 500;
  }

  .modal-box .disagree {
    background: #f4f4f5;
    color: #19be6b;
  }

  .modal-box .agree {
    background: #19be6b;
    color: #fff;
  }
</style>