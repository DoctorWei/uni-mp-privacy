# uni-mp-privacy (uni-app小程序隐私保护指引授权弹窗组件)

 本文档讲述的隐私保护指引授权弹窗组件适用于uni-app小程序，[微信小程序原生开发版本请查看这里](https://developers.weixin.qq.com/community/develop/article/doc/00040cdf6981c8983240486316b413)

微信发布[关于小程序隐私保护指引设置的公告](https://developers.weixin.qq.com/community/develop/doc/00042e3ef54940ce8520e38db61801)，为规范开发者的用户个人信息处理行为，保障用户的合法权益，自2023年9月15日起，对于涉及处理用户个人信息的小程序开发者，微信要求，仅当开发者主动向平台同步用户已阅读并同意了小程序的隐私保护指引等信息处理规则后，方可调用微信提供的隐私接口。

[小程序用户隐私保护指引内容介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/miniprogram-intro.html)里边所涉及到的隐私接口，都要做适配。

 使用[uni-mp-privacy](https://github.com/DoctorWei/uni-mp-privacy)uni-app小程序隐私保护指引授权弹窗组件可降低开发成本，简单配置就可使用。需要授权时展示弹窗，用户点击“拒绝”授权隐私接口时，不能调用隐私接口，但不影响小程序其他功能的使用，点击“同意”后继续调用隐私接口。

![uni-mp-privacy][doge]

## 1 - 仓库地址
-  [uni-mp-privacy【github】](https://github.com/DoctorWei/uni-mp-privacy)
-  [uni-mp-privacy【码云gitee】](https://gitee.com/WeiDoctor/uni-mp-privacy)

## 2 - 测试环境
- 微信小程序基础库版本：2.32.3 及以上

## 3 - 安装方法

下载源码，然后复制uni-mp-privacy下的components目录至您的项目

## 4 - 配置与使用

4.1 配置文件 manifest.json （2023年9月15日前调试需要此步配置）
```json
"mp-weixin" : {
    "libVersion": "2.32.3",
    "__usePrivacyCheck__": true,
}
```

4.2 App.vue全局配置
```js
  import mpstore from '@/components/mp-privacy/store'

  export default {
    onLaunch: function() {

      // 监听隐私接口需要用户授权事件
      if (wx.onNeedPrivacyAuthorization) {
        wx.onNeedPrivacyAuthorization(resolve => {
          // 需要用户同意隐私授权时，弹出开发者自定义的隐私授权弹窗
          mpstore.commit('setShowPrivacy', true)
          mpstore.commit('setResolvePrivacyAuthorization', resolve)
        })
      }

    }
  }
```

4.3 uni-app引入

#### 第一种，手动引入
```js
  import mpPrivacy from "@/components/mp-privacy/mp-privacy"
  export default {
    components: {
      mpPrivacy
    }
  }
```

#### 第二种，easycom组件模式引入（pages.json）
```json
  "easycom": {
    "autoscan": true,
    "custom": {
      "mp-privacy": "@/components/mp-privacy/mp-privacy.vue"
    }
  }
```

4.4 组件使用
```html
<mp-privacy />

<!-- 需要阅读后在同意配置 -->
<!-- <mp-privacy action="exit" :read="true" /> -->
```

4.5 所有使用到的隐私接口必须要在「小程序管理后台」设置《小程序用户隐私保护指引》，否则无法触发wx.onNeedPrivacyAuthorization 监听


## 组件可配置属性

| 属性   | 必填 |  类型  | 默认  | 说明       | 最低版本 |
| -----  | ---- | ------ | ----- | ------- | ------ |
| action |  否  | string  | none  | 用户点击拒绝后的程序动作。可选 exit 或 none，exit退出小程序 | 1.0.5 |
| read   |  否  | boolean | false | 是否必须有阅读动作才能点击同意按钮 | 1.0.5 |


[doge]:data:image/png;base64,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
