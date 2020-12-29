import {combination} from "../../utils/util";

class SkuCode {
    code
    spuId
    totalSegments = []

    constructor(code) {
        this.code = code;
        this._splitToSegments();
    }

    /**
     * 拆分片段
     * @private
     */
    _splitToSegments() {
        const spuAndSpec = this.code.split('$');
        this.spuId = spuAndSpec[0];

        const specCodeArray = spuAndSpec[1].split('#');
        const length = specCodeArray.length;
        for (let i = 1; i <= length; i++) {
            const sqgments = combination(specCodeArray, i);
            const newSeqments = sqgments.map(seq => {
                return seq.join('#');
            });
            this.totalSegments = this.totalSegments.concat(newSeqments);
        }

    }
}

export {SkuCode}