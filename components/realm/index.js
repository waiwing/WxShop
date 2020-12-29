/**
 * 领域
 */

// components/realm/index.js
import {FanceGroup} from "../models/fance-group";
import {Judger} from "../models/judger";
import {Spu} from "../../model/sku";
import {Cell} from "../models/cell";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object,
        previewImg: ''
    },

    observers: {
        'spu': function (spu) {
            if (!spu)
                return;

            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu);
            } else {
                this.processHasSpec(spu);
            }
        }
    },

    lifetime: {
        attached() {

        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        processNoSpec(spu) {
            this.setData({
                noSpec: true
            })
            this.bindSkuData(spu.sku_list[0])
        },
        processHasSpec(spu) {
            let fanceGroup = new FanceGroup(spu);
            fanceGroup.initFences();
            const judger = new Judger(fanceGroup);

            this.setData({
                judger
            })

            const defaultSku = fanceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku);
            } else {
                this.bindSpuData();
            }
            this.bindTipData();
            this.bindFenceGroupData(fanceGroup);
        },

        bindSpuData() {
            const spu = this.data.spu;
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discount_price: spu.discount_price,
                stock: spu.stock,
            });
        },
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discount_price: sku.discount_price,
                stock: sku.stock,
            });
        },
        bindTipData() {
            const SkuIntact = this.data.judger.isSkuIntact()
            this.setData({
                SkuIntact,
                currentCalues:this.data.judger.getCurrentValues(),
                missingKeys:this.data.judger.getMissingKeys()
            });
        },
        bindFenceGroupData(fanceGroup) {

            this.setData({
                fances: fanceGroup.fanceList,
            })
        },
        onCellTap(event) {

            let data = event.detail.cell;
            const rowIndex = event.detail.rowIndex;
            const colIndex = event.detail.colIndex;
            const cell = new Cell(data.spec);
            cell.status = data.status;

            const judger = this.data.judger;
            //改变每个九宫格的状态
            judger.judge(cell, rowIndex, colIndex);
            const skuInTact = judger.isSkuIntact();
            if (skuInTact) {
                const currentSku = judger.getDeterminateSku();
                this.bindSkuData(currentSku);
            }
            this.bindFenceGroupData(judger.fenceGroup);
            this.bindTipData();
        }
    }
})
