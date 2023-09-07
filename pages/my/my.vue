<template>
  <view class="content">
    <button class="btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">获取头像</button>
    <mp-privacy action="exit" :read="true" />
  </view>
</template>

<script>
  // import mpPrivacy from "@/components/mp-privacy/mp-privacy"
  export default {
    // components: {
    //   mpPrivacy
    // },
    methods: {
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