<script>
  import store from '@/components/mp-privacy/store'

  export default {
    onLaunch: function() {
      console.log('App Launch')

      // 监听隐私接口需要用户授权事件
      if (wx.onNeedPrivacyAuthorization) {
        wx.onNeedPrivacyAuthorization(resolve => {
          // 需要用户同意隐私授权时，弹出开发者自定义的隐私授权弹窗
          store.commit('setShowPrivacy', true)
          store.commit('setResolvePrivacyAuthorization', resolve)
        })
      }
    }
  }
</script>