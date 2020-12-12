// pages/home/home.js
import {
    Config
} from '../../config/config'
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ThemeA: null,
        BannerB: null,
        Grid: [],
        ThemeE: null,
        Activity: null,
        loadType: 'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.IntAllData();
        await this.initBottomSpuList();
    },

    /**
     * 初始话所有数据
     * @returns {Promise<void>}
     * @constructor
     */
    async IntAllData() {
        const themeModel = new Theme();
        await themeModel.getThemes();
        const bannerB = await Banner.getLocationB();
        const grid = await Category.getCategoryLocationC();
        const activity = await Activity.getHoneLocaltionD();
        const themeE = themeModel.getLocationE();
        const themeF = themeModel.getLocationF();
        const bannerG = await Banner.getLocationG();
        const themeH = themeModel.getLocationH();


        let themeESpu = [];
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu();
            if (data) {
                themeESpu = data.spu_list.slice(0, 8);
            }
        }

        this.setData({
            ThemeA: themeModel.getLocationA(),
            BannerB: bannerB,
            Grid: grid,
            Activity: activity,
            ThemeE: themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },

    async initBottomSpuList() {
        //获取分页组件对象
        const spuPaging = SpuPaging.getLatestPaging();
        this.data.spuPaging = spuPaging;
        const data = await spuPaging.getMoreData();
        if (!data)
            return;

        //累计，第二个参数炜清空
        wx.lin.renderWaterFlow(data.items)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData();
        if (!data) {
            this.setData({
                loadType: 'end'
            })
            return;
        }
        wx.lin.renderWaterFlow(data.items)
    }
})