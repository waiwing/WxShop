import {Http} from "../utils/http";

class Temp {


    static async GetData() {
        return await Http.request({
            url: ``,
            data:{}
        });
    }
}

export {Temp}