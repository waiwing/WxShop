// pages/detail/detail.js
import {Spu} from "../../model/sku";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spu: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {

        const spu = await Spu.getSpuDetail(options.pid);
        this.setData({spu});
    },
})