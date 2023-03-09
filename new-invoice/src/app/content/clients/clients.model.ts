
export class Clients {
  private firstname: string;
  private lastname: string;
  private email: string;
  private phone: number;
  private address: string;
  private address2: string;
  private postalcode: number;
  private state: string;
  private city: string;
  private country: string;
  private description: string;
  private image: string;
  constructor(params:any){
    this.firstname = params.firstname || "";
    this.lastname = params.lastname || "";
    this.email = params.email || "";
    this.phone = params.phone || "";
    this.address = params.address || "";
    this.address2 = params.address2 || "";
    this.postalcode = params.postalcode || "" ;
    this.state = params.state || "";
    this.city = params.city || "";
    this.country = params.country || "";
    this.description = params.description || "";
    this.image = params.image || "";

  }



}
