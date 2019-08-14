// pages/movies/movies.js
var app = getApp();
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
    // 正在热映
    var webUrl = app.globalData.doubanBase;
    var inTheatersUrl = webUrl+"/v2/movie/in_theaters";
    // 即将上映
    var comingSoonUrl = webUrl+"/v2/movie/coming_soon";
    // 最热的250部电影
    var top250Url = webUrl+"/v2/movie/top250";
    // 异步请求
    this.getMovieListData(inTheatersUrl);
    this.getMovieListData(comingSoonUrl);
    this.getMovieListData(top250Url);

  },

  getMovieListData:function(url) {
    wx.request({
      url: url,
      method: 'GET',
      header:{
        "Content-Type":"json"
      },
      success:function(res) {
          console.log(res);
      },
      fail:function() {
        
      }
    })
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