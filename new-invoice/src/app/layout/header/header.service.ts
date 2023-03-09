import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private header: BehaviorSubject<any> =  new BehaviorSubject([]);
  currentheader = this.header.asObservable()


  constructor() {
    
  }

  changeheader(headername: string){

    this.header.next(headername)

  }



}
