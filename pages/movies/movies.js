// pages/movies/movies.js
// 引入Util工具
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250Url:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 正在热映
    var webUrl = app.globalData.doubanBase;
    var inTheatersUrl = webUrl+"/v2/movie/in_theaters"+"?start=0&count=3";
    // 即将上映
    var comingSoonUrl = webUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
    // 最热的250部电影
    var top250Url = webUrl + "/v2/movie/top250" + "?start=0&count=3";
    // 异步请求
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },
  onMoreTap:function(event) {
    // 获取电影分类类型
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    });
  },
  getMovieListData: function (url, settedKey,categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header:{
        "Content-Type":"json"
      },
      success:function(res) {
        //  console.log(res);
        that.processDoubanData(res.data, settedKey,categoryTitle);

      },
      fail:function() {
        
      }
    })
  },
  // 处理豆瓣数据
  processDoubanData: function (movicesDouban, settedKey,categoryTitle) {
    var movies = [];
    // 遍历数据
    for (var idx in movicesDouban.subjects) {
      var subject = movicesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6) {
        title = title.substring(0,6)+"...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
      // 根据settedKey的不同，设置属性值。
      var readyData = {};
      readyData[settedKey]={
        categoryTitle: categoryTitle,
        movies:movies
      };
      this.setData(readyData);
    }
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