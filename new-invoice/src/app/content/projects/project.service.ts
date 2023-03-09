import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private http: HttpClient) { }

  getProjects(){

    // this.http.get('project/getprojects').subscribe((response:any)=>{
    //   console.log(response);

    // })
    this.http.get<any>('project/getprojects').subscribe((response:any)=>{
     return response;
    })
  }
  getprojectswithquery(a:number,b:number){
    console.log(`project/getprojects?skip=${a}&limit=${b}`);
    
   return this.http.get(`project/getprojects?skip=${a}&limit=${b}`)
  }
  addProjects(project:Project){
    console.log(project);

    this.http.post('project/addproject', project,{responseType:'text'}).subscribe(response=>{
      console.log(response);

    });

  }


  editprojects(id:string, body:any){
    console.log(id);
    console.log(body);


    this.http.put('project/editproject/'+id,body, {responseType:'text'}).subscribe(response=>{
      console.log(response);

    })
    // window.location.reload()
  }

  deleteproject(id:string){
    console.log(id);
    this.http.delete('project/deleteproject/'+id,{responseType:'text'}).subscribe((response)=>{
      console.log(response);

    })
  }
}
