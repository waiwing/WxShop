import {Config} from "../config/config";
import {promisic} from "./util";

class Http {
    static async request({url, data, callBack, method = 'get'}) {
        return await promisic(wx.request)({
            url: `${Config.apiBaseUrl}${url}`,
            data: data,
            method: method,
            header: {
                appkey: Config.appkey
            }
        });
    }
}

export {
    Http
}