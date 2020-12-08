// pages/home/home.js
import {
    Config
} from '../../config/config'
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ThemeA: null,
        BannerB: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.IntAllData();
    },

    /**
     * 初始话所有数据
     * @returns {Promise<void>}
     * @constructor
     */
    async IntAllData() {
        let themeA = await Theme.getLocationA();
        let bannerB = await Banner.getLocationB();

        this.setData({
            ThemeA: themeA.data[0],
            BannerB:bannerB.data
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