import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }


  demo(body:any){
    console.log('demo called');
    console.log(body);

   this.http.post('http://localhost:5200/new-invoice/login/usersettings',body,{responseType:'text'}).subscribe((response)=>{
    console.log(response);
    return response
   })
  }
}
