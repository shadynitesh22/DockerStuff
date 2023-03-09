import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;


  constructor(private fb:FormBuilder, private logauth: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  onSubmit(){
    if(this.loginForm.valid){
      this.logauth.loginUser(this.loginForm.value).then(
        (result:any) =>{
              console.log(result);

               console.log(result['token'])

               localStorage.setItem('token', result['token'])
               const token=result['token']
               if(token){
               this.router.navigate(['content/dashboard'])
               }
               
        },
        (err:any) =>{
          console.log(err.error);

          alert(err.message);
        }



      )
    }
  }
  ngOnInit(): void {
  }

}
