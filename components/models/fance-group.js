import {Http} from "../../utils/http";
import {Matrix} from "./matrix";
import {Fance} from "./fance";

class FanceGroup {

    spu;
    skuList = [];
    fanceList = [];

    constructor(spu) {

        this.spu = spu;
        this.skuList = spu.sku_list;
    }

    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id;
        if (!defaultSkuId) {
            return;
        }
        return this.skuList.find(s => s.id === defaultSkuId);
    }

    initFences() {
        const matrix = this._createMatrix(this.skuList);
        const fanceList = [];
        const at = matrix.transpose();
        at.forEach((row) => {
            let fance = new Fance(row);
            fance.init();
            fanceList.push(fance);
        })
        this.fanceList = fanceList;
    }


    eachCell(cb) {
        for (let i = 0; i < this.fanceList.length; i++) {
            for (let j = 0; j < this.fanceList[i].CellList.length; j++) {
                const cell = this.fanceList[i].CellList[j];
                cb(cell, i, j);
            }
        }
    }

    _createMatrix(skuList) {
        const m = [];
        skuList.forEach(sku => {
            m.push(sku.specs);
        })
        return new Matrix(m);
    }

    setCellStatusBYId(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status;
            }
        });
    }

    setCellStatusByXY(x, y, status) {
        this.fanceList[x].CellList[y].status = status;
    }

    getSku(skuCode) {
        const fullSkuCode = this.spu.id+'$'+skuCode;
        const sku = this.spu.sku_list.find(s => {
            return s.code === fullSkuCode;
        })
        return sku ? sku : null;
    }
}

export {FanceGroup}