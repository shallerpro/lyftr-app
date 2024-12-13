import {IdModel} from "./id.model";


/**
 * CategorieModel
 */
class CategorieModel extends IdModel {

    name: string = "";
    wpId : string = "";
    hostRef : any


    constructor(raw: any = {}, defaultId = "" ,  ) {
        super();
        this.init(raw, defaultId);
    }


}


export {
    CategorieModel
};
