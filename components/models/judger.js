import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {Cell} from "./cell";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

/**
 * 路径
 */
class Judger {
    fenceGroup
    pathDict = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this.initPathDict();
        this._initSkuPending();
    }

    /**
     * 是否已经选择
     */
    isSkuIntact() {
        return this.skuPending.isIntact();
    }

    _initSkuPending() {
        const specsLength = this.fenceGroup.fanceList.length;
        this.skuPending = new SkuPending(specsLength);
        this._initSelectedCell();
    }

    _initSelectedCell() {
        const defualtSku = this.fenceGroup.getDefaultSku();
        if (!defualtSku) {
            return;
        }

        this.skuPending.init(defualtSku);
        //设置默认cell为可选状态
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusBYId(cell.id, CellStatus.SELECTED);
        });
        //初始话设置cell状态
        this.judge(null, null, null, true);
    }

    initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    /**
     * 改变状态
     * @param cell
     * @param rowIndex
     * @param colIndex
     */
    judge(cell, rowIndex, colIndex, isInit = false) {
        if (!isInit) {
            //改变当前cell状态
            this._changeCurrentCellsStatus(cell, rowIndex, colIndex);
        }
        //改变其他Cel'状态
        this.fenceGroup.eachCell((cell, rowIndex, colIndex) => {
            const path = this._findPotentialPath(cell, rowIndex, colIndex);
            if (!path)
                return;
            const isIn = this._isInDict(path);
            if (isIn) {
                this.fenceGroup.setCellStatusByXY(rowIndex, colIndex, CellStatus.WAITING);
            } else {
                this.fenceGroup.setCellStatusByXY(rowIndex, colIndex, CellStatus.FORBIDDEN);
            }
        })
    }

    /**
     * 路径是否包含在字典中
     * @param path
     * @returns {boolean}
     * @private
     */
    _isInDict(path) {

        return this.pathDict.includes(path)
    }

    /**
     * 潜在路径
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#');
        for (let i = 0; i < this.fenceGroup.fanceList.length; i++) {
            const selected = this.skuPending.findSelectCellByX(i);
            //当前行
            if (x === i) {
                if (this.skuPending.isSelected(cell, x)) {
                    return;
                }
                const cellCode = this._getCellCode(cell.spec);
                joiner.join(cellCode);
            } else {//其他行
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode);
                }
            }

        }
        return joiner.getStr();
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id;
    }

    /**
     * 改变当前单元格状态
     * @param cell
     * @param rowIndex
     * @param colIndex
     * @private
     */
    _changeCurrentCellsStatus(cell, rowIndex, colIndex) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCellStatusByXY(rowIndex, colIndex, CellStatus.SELECTED);
            const currentSelectCell = this.skuPending.findSelectCellByX(rowIndex);

            if (currentSelectCell) {
                currentSelectCell.status = CellStatus.WAITING;
            }
            this.skuPending.insertCell(cell, rowIndex);
            return;
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(rowIndex, colIndex, CellStatus.WAITING);
            // this.fenceGroup.fanceList[rowIndex].CellList[colIndex].status = CellStatus.WAITING;
            this.skuPending.removeCell(rowIndex);
            return;
        }
    }

    getDeterminateSku() {
        const code = this.skuPending.getSkuCode();
        const sku = this.fenceGroup.getSku(code);
        return sku;
    }

    getMissingKeys() {
        const missingKyesIndex = this.skuPending.getMissingSpecKeysIndex();
        const missingKyes = missingKyesIndex.map((i) => {
            return this.fenceGroup.fanceList[i].title;
        });
        return missingKyes;
    }

    getCurrentValues() {
        return this.skuPending.getCurrentSpecValues();
    }
}

export {Judger}