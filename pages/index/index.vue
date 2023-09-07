<template>
  <view class="content">
    <button class="btn" open-type="getPhoneNumber" @getphonenumber="getphonenumber">手机号登录</button>
    <button class="btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">获取头像</button>
    <mp-privacy />
  </view>
</template>

<script>
  export default {
    methods: {
      getphonenumber(e) {
        console.info(e)
      },
      onChooseAvatar(e) {
        console.info(e)
      }
    }
  }
</script>

<style>
  .content {
    padding-top: 100rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .btn {
    margin-top: 40rpx;
  }
</style>