import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private url = 'client/addclient';
  private client$: Subject<any> = new Subject();
  private client: any;
  constructor(private http: HttpClient) { }


  createclient(clients:any){
    console.log(clients);

    return this.http.post(this.url, clients, {responseType:'text'})
  }

  getclients():any{

   return this.http.get('client/getclients')

  }

  getClientswithquery(a:any,b:any){
    console.log(`client/getclients?skip=${a}&limit=${b}`);

    return this.http.get(`client/getclients?skip=${a}&limit=${b}`)
  }


  editclient(id:any, body:any){
    console.log(id);

    this.http.put('client/editclient/'+id,body,{ responseType: 'text'}).subscribe(response=>{
      console.log(response);

    })

  }

  deleteclient(id:any){
    console.log(id);
    this.http.delete('client/deleteclient/'+id,{responseType:'text'}).subscribe(response=>{
      console.log(response);

    });
    console.log('deleted');

  }

  getclient(id:any):any{
    return new Promise((resolve,reject)=>{this.http.get('client/getclient/'+id).subscribe((response)=>{
      console.log(response);

      resolve(response) }
    )})
  }


  clientwithproject(id:any):any{
    return new Promise((resolve,reject)=>{this.http.get('client/client/'+id).subscribe((response)=>{
      console.log(response);

      resolve(response) }
    )})
  }

  clientProjects(id:any):any{
    return this.http.get('project/clientprojects/'+id)
  }


  testclient(body:any):any{
    console.log(body);

    console.log('testclient working');

    return this.http.post('client/imagedemo', body)
  }

}
