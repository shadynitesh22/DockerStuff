export class Invoice {
  private type:string;
    private clientname: string;
    private projectname: string;
    private projecttype: string;
    private createdby:string;
    private issuedate:Date;
    private duedate:Date;
    private invoicenumber: number;
    // private itemdetails: string;
    // private quantity: number;
    // private rate:number;
    // private tax: number;
    // private amount: number;

    private itemdetails : Array<any> =[{
      itemsdetails:String,
      quantity: Number,
      tax: Number,
      rate:Number,
      amount: Number,
    }]

    private subtotal:number;
    private discount: number;
    private total :number;
    private description: string;
    private notes: string;





    constructor(params:any){
      this.type = params.type || "";
      this.clientname = params.clientname || "";
      this.projectname = params.projectname || "";
      this.projecttype = params.projecttype || "";
      this.createdby = params.createdby || "";
      this.issuedate =  params.issuedate || "";
      this.duedate = params.duedate || "";
      this.invoicenumber = params.invoicenumber || "";
      this.itemdetails = [{
        itemsdetails : params.itemsdetails || "",
        quantity: params.quantity || null,
        tax: params.tax|| null,
        rate:params.rate|| null,
        amount: params.amount|| null,
      }]
      // this.itemdetails = params.itemdetails || "";
      // this.quantity = params.quantity || "";
      // this.rate = params.rate || "";
      // this.tax = params.tax || "";
      // this.amount = params.amount || "";
      this.subtotal = params.subtotal || "";
      this.discount = params.discount || "";
      this.total = params.total || "";
      this.description = params.description || "";
      this.notes = params.notes || "";



  }
}

