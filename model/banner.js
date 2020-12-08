import {Http} from "../utils/http";

class Banner {
    static  locationBName = 'b-1'

    static async getLocationB() {
        return await Http.request({
            url: `/banner/name/${Banner.locationBName}`
        });
    }
}

export {Banner}