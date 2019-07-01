Page({
  onTap:function(event){
    // 页面跳转,跳转的页面被当成子页面
    // wx.navigateTo({
    //   url: '../posts/post',
    // })
    // 页面跳转,跳转的页面和被跳转的页面相互独立
    wx.redirectTo({
      url: '../posts/posts',
    })
  }
})