export class Project {

    private client: string;
    private projectname: string;
    private projecttype: string;
    private email: string;
    private address: string;
    private address2: string;
    private postalcode: number;
    private state: string;
    private city: string;
    private country: string;
    private description: string;

    constructor(params:any){
        this.client = params.client|| "";
        this.projectname = params.projectname || "";
        this.projecttype = params.projecttype || "";
        this.email = params.email || "";

        this.address = params.address || "";
        this.address2 = params.address2 || "";
        this.postalcode = params.postalcode || "" ;
        this.state = params.state || "";
        this.city = params.city || "";
        this.country = params.country || "";
        this.description = params.description || "";

    }

}
