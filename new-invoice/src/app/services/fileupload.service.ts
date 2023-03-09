import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  baseURL = 'https://file.io'
  constructor(private http : HttpClient) {

   }
   upload(file:any):Observable<any>{

    const formdata = new FormData();

    formdata.append("file",file,file.name);
    return this.http.post(this.baseURL
      ,formdata)
  }
}
