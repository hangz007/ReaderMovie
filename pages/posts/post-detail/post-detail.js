var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var globalData = app.globalData;
    var postId = options.id;
    var post = postsData.postList[postId];
    this.data.currentPostId = postId;
    this.setData({
      postData: post
    });
    // 获取缓存对象posts_collected的值
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        });
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      });
    }
    this.setMusicMonitor();
  },
  setMusicMonitor: function() {
    var that = this;
    // 监听音乐播放
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },
  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postId = this.data.currentPostId;
    var postCollected = postsCollected[postId];
    // 收藏改为未收藏，未收藏改为收藏
    postCollected = !postCollected;
    postsCollected[postId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },
  // 模态框
  showModal: function(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function(res) {
        if (res.confirm) {
          // 更新当前文章的收藏状态缓存
          wx.setStorageSync("posts_collected", postsCollected);
          // 更新数据
          that.setData({
            collected: postCollected
          });
        }
      }
    })
  },
  showToast: function(postsCollected, postCollected) {
    var that = this;
    // 更新当前文章的收藏状态缓存
    wx.setStorageSync("posts_collected", postsCollected);
    // 更新数据
    that.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '现在无法实现分享功能'
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImageUrl: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
    }
  },

   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(event) {
    return {
      title: '离思五首·其四',
      desc: '曾经沧海难为水，除却巫山不是云',
      path: '/pages/posts/post-detail/post-detail?id=0'
    }
  }
})