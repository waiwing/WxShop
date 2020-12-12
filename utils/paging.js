import {Http} from "./http";
import method from "../miniprogram_npm/lin-ui/common/async-validator/validator/method";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

class Paging {

    req
    url
    start
    count
    locker = false;
    moreData = true;
    accumulator = [];

    constructor(req,count = 10,start = 0) {

        this.req = req;
        this.count = count;
        this.start = start;
        this.url = req.url;
    }

    async getMoreData() {
        //没有更多数据
        if (!this.moreData)
            return;
        //防抖加锁,获取锁
        if (!this._getLocker()) {
            return;
        }
        let data = await this._actualGetData();
        //释放锁
        this._releaseLocker();
        return data;
    }

    async _actualGetData() {
        const req = this._getCurrentReq();
        let paging = await Http.request(req);
        if (!paging)
            return null;

        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }

        this.moreData = this._moreData(paging.total_page, paging.page);
        if (this.moreData) {
            this.start += this.count;
        }

        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this._accumulator()
        }
        //返回特定的数据结构
        // return {
        //     empty: paging.total === 0,
        //     items: [],
        //     moreData: t,
        //     accumulator: []
        // }
    }

    /**
     * 获取
     * @param items
     * @returns {[]}
     * @private
     */
    _accumulator(items) {
        this.accumulator = this.accumulator.concat(items);
        return this.accumulator;
    }

    _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    _getCurrentReq() {
        let url = this.url;
        const params = `start=${this.start}&count=${this.count}`;
        if (url.includes('?')) {
            url += '&' + params;
        } else {
            url += '?' + params;
        }
        this.req.url = url;
        return this.req;
    }

    _getLocker() {
        if (this.locker) {
            return false;
        }

        this.locker = true;
        return true;
    }

    _releaseLocker() {
        this.locker = false;
    }

}

export {
    Paging
}