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
    // 导航条提示加载
    wx.showNavigationBarLoading();
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
      var totalMovies = {};
      movies.push(temp);
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
    }
  },
  /**
   * 设置导航栏标题
   */
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  onScrollLower: function() {
    var nextUrl = this.data.requestUrl + "?start=" +
      this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
  }

})