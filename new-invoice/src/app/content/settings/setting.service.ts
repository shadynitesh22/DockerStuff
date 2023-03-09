import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:HttpClient) { }

  saveSetting(body:any){
    this.http.post('login/usersettings',body).subscribe((response)=>{
      console.log(response);

    })

  }

  getsettings(){
    return this.http.get('login/getsettings')
  }
}
