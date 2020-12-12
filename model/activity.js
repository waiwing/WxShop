import {Http} from "../utils/http";

class Activity {

static  activityName  = 'a-2';
    static async getHoneLocaltionD() {
        return await Http.request({
            url: `/activity/name/`+Activity.activityName,
            data:{}
        });
    }
}

export {Activity}