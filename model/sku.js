import {Http} from "../utils/http";

class Spu {
    static async getSpuDetail(id) {
        return  Http.request({
            url: `/spu/id/${id}/detail`,
            data:{}
        });
    }

    /**
     * 是否无规格
     */
    static isNoSpec(spu){
        if(spu.sku_list.length === 1 && spu.sku_list[0].specs.length ===0){
            return true;
        }

        return false;
    }
}

export {Spu}