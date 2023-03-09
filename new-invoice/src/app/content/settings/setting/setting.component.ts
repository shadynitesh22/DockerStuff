import { Component, OnInit } from '@angular/core';
import { Setting } from '../setting.model';
import { SettingService } from '../setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  params:any;
  settings:any;

  Toast = Swal.mixin({
    toast: true,
    position:'bottom-right',
    showConfirmButton:false,
    timer:2000,
    timerProgressBar:true,
  })

  constructor(private settingBackend:SettingService) {

   }

  ngOnInit(): void {
    this.params = new Setting({});
    this.settingBackend.getsettings().subscribe((response)=>{
      this.settings = response
      console.log("this.settings", this.settings);
      this.params.client = this.settings[0]['client']
      this.params.project = this.settings[0]['project']

    });


  }
  ngDoCheck(){
  
  }
  OnSubmit(){
    this.settingBackend.saveSetting(this.params)
  
    localStorage.setItem('client', this.params['client']);
    localStorage.setItem('project', this.params['project'])
 
    this.Toast.fire({
      icon:'success',
      title:'Settings Saved'
    })
  }
}
