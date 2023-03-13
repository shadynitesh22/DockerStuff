import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import loginInfo from '../info.json';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
   resp!: any;
  constructor(private http: HttpClient) { }

  login({email,password}:any):Promise<any>{
    return new Promise((resolve, reject) => {
      if (loginInfo.filter(f=>f.email==email&&f.password==password).length>0)
      {
        resolve(true)
      }
      reject(throwError)

    });

}

loginUser(value: any){
  return new Promise((resolve,reject)=>{
    this.http.post('https://7e05-2400-1a00-b020-f1c6-d345-6f30-8dc5-ccc4.ap.ngrok.io/new-invoice/v1/userLogin',value).subscribe((response)=>{


    console.log(response);


    resolve(response)
    },(error)=>{
      console.log(error);
      console.log(error.error);

      reject(error)
    });
  })
    // localStorage.setItem('token', response['token'])

  // token = response.token
  // console.log(token);

  // localStorage.setItem('token', response.token)



  localStorage.setItem('hehe','hehe');
  console.log( this.http.get<any>('https://7e05-2400-1a00-b020-f1c6-d345-6f30-8dc5-ccc4.ap.ngrok.io/new-invoice/v1/invoice/getinvoice')  )
  return new Promise((resolve,reject)=>{
    resolve(true)
  })
}
}
