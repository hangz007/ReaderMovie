// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    navigateTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    console.log(category);
    this.data.navigateTitle = category;
    var dataUrl = '';
    var webUrl = app.globalData.doubanBase;
    switch (category) {
      case "正在热映":
        dataUrl = webUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = webUrl + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = webUrl + "/v2/movie/top250";
        break;
    }
    // 设置请求Url
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },
  processDoubanData: function(movicesDouban) {
    var movies = [];
    // 遍历数据
    for (var idx in movicesDouban.subjects) {
      var subject = movicesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }

    var totalMovies = {};
    // 如果要绑定新加载的数据，那么需要绑定旧的数据
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    // 隐藏导航条加载
    wx.hideNavigationBarLoading();
    // 停止页面刷新
    wx.stopPullDownRefresh();
  },
  /**
   * 设置导航栏标题
   */
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  // // 上拉加载更多数据
  // onScrollLower: function() {
  //   var nextUrl = this.data.requestUrl + "?start=" +
  //   this.data.totalCount + "&count=20";
  //   util.http(nextUrl, this.processDoubanData);
  // },
  // 屏蔽onScrollLower，新增onReachBottom函数，监控上拉刷新
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  // 下拉刷新数据
  onPullDownRefresh: function() {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  }

})