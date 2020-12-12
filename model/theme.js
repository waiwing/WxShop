import {Http} from "../utils/http";

class Theme {
    static  localtionA = 't-1';
    static  localtionE = 't-2';
    static  localtionF = 't-3';
    static  localtionH = 't-4';

    Themes = [];

    constructor() {

    }

    /**
     * 获取所有主题
     * @returns {Promise<*>}
     * @constructor
     */
    async getThemes() {
        const nameParam = [Theme.localtionA, Theme.localtionE, Theme.localtionF, Theme.localtionH];
        this.Themes = await Http.request({
            url: '/theme/by/names',
            data: {
                names: nameParam.join(',')
            }
        });
    }

    getLocationA() {
        return this.Themes.find(obj => obj.name == Theme.localtionA);
    }

    getLocationE() {
        return this.Themes.find(obj => obj.name == Theme.localtionE);
    }

    getLocationH() {
        return this.Themes.find(obj => obj.name == Theme.localtionH);
    }

    getLocationF() {
        return this.Themes.find(obj => obj.name == Theme.localtionF);
    }

    static  getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.localtionE);
    }

    /**
     * 获取Spu数据
     * @param name
     * @returns {Promise<void>}
     */
    static  getThemeSpuByName(name) {
        return  Http.request({
            url: `/theme/name/${name}/with_spu`
        });
    }
}

export {Theme}