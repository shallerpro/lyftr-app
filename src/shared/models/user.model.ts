import {IdModel} from "./id.model";


/**
 * UserModel
 */
class UserModel extends IdModel {

    name: string = "";
    organizationRef? :any ;
    fcmToken = "";

    /**
     * Constructor
     * @param {any} raw
     * @param {string} defaultId
     */
    constructor(raw: any = {}, defaultId = "") {
        super();
        this.init(raw, defaultId);

    }


}


export {
    UserModel
};
