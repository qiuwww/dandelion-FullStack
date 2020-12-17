// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'About',
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: 'https://github.com/zce/weapp-douban',
      avatarUrl: '../../images/qrcode.png'
    }
  },

  getUserInfo () {
    app.wechat.getUserInfo()
      .then(res => {
        console.log("userInfo", res);
        this.setData({ userInfo: res.userInfo })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
  onLoad () {
    app.wechat.login()
      .then(res => {
        console.log("login", res);
        if (res.code) {
          console.log('登录成功！' + res.code)
        } else {
          console.error('获取用户登录态失败！' + res.errMsg)
        }
      })
  }
})
