import {IdModel} from "./id.model";


/**
 * HostModel
 */
export class HostModel extends IdModel {
    description: string = "";
    url : string = "";
    key: string = "";

    AiSystemInstruction : string = "";
    AiIKeywords : string = "";

    organizationRef? :any ;

    refreshPost : boolean = false ;
    refreshCategories : boolean = false ;


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


