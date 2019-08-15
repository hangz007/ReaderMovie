// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    navigateTitle: ''
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
    util.http(dataUrl, this.processDoubanData);
  },
  processDoubanData: function (movicesDouban) {
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
      this.setData({ movies: movies});
    }
  },
  /**
   * 设置导航栏标题
   */
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }
})