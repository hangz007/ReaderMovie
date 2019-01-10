Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var posts_content= [
    {
      date:"Sep 18 2016",
      title: "正是虾肥蟹壮时",
      post_img:"/images/post/crab.png",
      author_img:"/images/avatar/1.png",
      content:"虾肥蟹壮正当时,此时不吃待何时",
      view_num:"112",
      collect_num:"96"
    },
    {
      date: "Sep 18 2016",
      title: "比利林恩的故事",
      post_img: "/images/post/bl.png",
      author_img: "/images/avatar/1.png",
      content: "比利林恩传奇的中场故事",
      view_num: "92",
      collect_num: "80"
    }]
    this.setData({posts_key:posts_content});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})