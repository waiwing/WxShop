// pages/skuHomeWork/sku.js
import {
    Http
} from "../../utils/http";
import {
    Spu
} from "../../model/sku";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        skuObj: null,
        SpecificationList: [], //初始化
        selectItemList: [], // 选中列表
        // key_id,
        // value_id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.InitData();
    },

    async InitData() {
        //加载sku数据
        const sku = await Spu.getSpuDetail(2);

        let SpecificationList = [];

        //规格名称
        sku.sku_list.forEach(item => {
            //便利属性
            item.specs.forEach(specs => {
                let SpecificationItem = {
                    key_id: specs.key_id,
                    key_name: specs.key,
                    valueList: []
                };
                let tempItem = SpecificationList.find(a => a.key_id === specs.key_id);
                if (tempItem != undefined) {
                    SpecificationItem = tempItem;
                } else {
                    SpecificationList.push(SpecificationItem);
                }

                if (SpecificationItem.valueList.find(a => a.value_id == specs.value_id) == undefined) {
                    SpecificationItem.valueList.push({
                        key_id: specs.key_id,
                        value_id: specs.value_id,
                        value_name: specs.value
                    });
                }
            });

        });

         this.setData({
            skuObj: sku,
            sku,
            SpecificationList
        });
    },
    skuItemClickHandler(event) {

        const value_id = event.currentTarget.dataset.valid;
        const key_id = event.currentTarget.dataset.keyid;
        const disable = event.currentTarget.dataset.disable;
        if (disable)
            return;

        let selectItemList = this.data.selectItemList;
        //没有则添加
        if (selectItemList.findIndex(item => item.value_id === value_id && item.key_id === key_id) == -1) {

            //如果存在同类型，则取消同类型的
            if(selectItemList.findIndex(item =>  item.key_id === key_id) != -1){
                selectItemList.splice(selectItemList.findIndex(item =>  item.key_id === key_id), 1);
            }

            selectItemList.push({
                value_id,
                key_id
            })
        } else {
            //有则删除
            selectItemList.splice(selectItemList.findIndex(item => item.value_id === value_id && item.key_id === key_id), 1);
        }
        this.setData({
            selectItemList
        });
    },
    /**
     * 禁用属性
     * @private
     */
    _DisableBtn() {

    }

})