import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Test } from '../test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  params:any;
  shortlink:string='';
  loading:boolean= false;
  file!: File;
  pageNumber!: number;
  Toast = Swal.mixin({
    toast: true,
    position:'bottom-right',
    showConfirmButton:false,
    timer:2000,
    timerProgressBar:true,
  })
  constructor(private testbackend: TestService, private http:HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.params =  new Test({})
    this.route.data.subscribe((test: any) => {
      console.log(test);
      this.pageNumber = test['test']

    })
  }

  ngDoCheck(){
    console.log(this.pageNumber);

  }

  addclient(){
    console.log(this.params);
    this.params.text = "asdfasdf"
    this.params.name = 'bkb'
    const formdata = new FormData();
    formdata.set('image', this.file)
    formdata.set('client',JSON.stringify(this.params))
    formdata.append('world','world')

    console.log(formdata);

    this.http.post('client/imagedemo', formdata).subscribe((response)=>{
      console.log(response);

    })
    localStorage.setItem('paginate', this.params.type)
    // this.testbackend.demo(this.params).subscribe((response)=>{
    //   console.log(response);

    // })

    // this.Toast.fire({
    //   icon:'success',
    //   title:'Client Added'
    // })
    // this.params = ''
  }





  onchange(event:any){
    this.file = event.target.files[0]
    console.log(this.file)
    // this.params.image = this.file
    this.params.image = this.file
    console.log(this.params.image);

  }

  onUpload(){
    this.loading = !this.loading;
    console.log(this.file)
    // this.fileup.upload(this.file).subscribe((event:any)=>{
    //   if(typeof(event)==='object'){
    //     this.shortlink =  event.link;
    //     this.loading = false;

    //   }
    // });
  }

  saveSetting(){
    console.log(this.params);

    console.log("this is called");

    this.params.type = 'frontend'
    this.testbackend.demo(this.params)
    console.log('after it is called');

  }

}
