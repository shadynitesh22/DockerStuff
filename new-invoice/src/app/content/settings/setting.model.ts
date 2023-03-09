export class Setting {
  // private settings : Array<any> = [{
  //   client: String,
  //   project:String
  // }]

    private client: string;
    private project: string;

  constructor(params:any){
    // this.settings = [{
    //   client: params.clientsettings || "",
    //   project : params.projectsettings || "",
    // }]
    this.client = params.client || "",
    this.project = params.project || ""
  }
}
