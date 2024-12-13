import {IdModel} from "./id.model";



export enum PostType {
    draft = 0,
    normal = 1,
    temporary = 2,
}

/**
 * PostModel
 */
export class PostModel extends IdModel {
    title: string = "";
    content: string = "";
    imageUrl: string = "";
    category: string = "";
    type: PostType = PostType.draft;
    checksum : string = "";
    organizationRef? : any ;
    hostRef? : any ;
    wpId : number = -1;
    AiPattern : string = "";
    AiImagePattern : string = "";
    AiWorking = false ;
    catRefs? : any ;
    published : boolean = true ;
    durationAt : string = "";

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


