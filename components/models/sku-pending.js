import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = []
    size

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }
    }

    constructor(specsLength) {
        this.size = specsLength;
    }

    insertCell(cell, x) {
        this.pending[x] = cell;
    }

    removeCell(x) {
        this.pending[x] = null;
    }

    /**
     * 获取选中行cell
     * @param x
     * @returns {*}
     */
    findSelectCellByX(x) {
        return this.pending[x];
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x];
        if (!pendingCell) {
            return false;
        }
        return cell.id == pendingCell.id;
    }


    isIntact() {
        if (this.size !== this.pending.length) {
            return false;
        }
        for (let i = 0; i < this.size; i++) {
            if (this.isEmptyPart(i)) {
                return false;
            }
        }
        return true;
    }

    isEmptyPart(index) {
        return this.pending[index] ? false : true;
    }

    getSkuCode() {
        const joiner = new Joiner('#');

        this.pending.forEach(cell => {
            joiner.join(cell.getCellCode())
        });
        return joiner.getStr();
    }

    getCurrentSpecValues() {
        const values = this.pending.map(cell => {
              if(cell){
                  return cell.spec.value;
              }
              return null;
        });
        return values;
    }

    getMissingSpecKeysIndex() {
        const keysIndex = [];
        for (let i = 0; i < this.size; i++) {
            if(!this.pending[i])
            {
                keysIndex.push(i);
            }
        }
        return keysIndex;
    }
}

export {SkuPending}