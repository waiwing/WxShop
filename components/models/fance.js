import {Http} from "../../utils/http";
import {Cell} from "./cell";

class Fance {

    CellList = [];
    specs;
    title;
    id


    constructor(specs) {
        this.specs = specs;
        this.title = specs[0].key;
        this.id = specs[0].key_id;
    }

    init() {
        this._initCells();
    }

    _initCells() {
        this.specs.forEach(item => {
            const exisited = this.CellList.some(c => {
                return c.id == item.value_id
            })

            if (exisited)
                return;
            const cell = new Cell(item);
            this.CellList.push(cell);
        });
    }
}

export {Fance}