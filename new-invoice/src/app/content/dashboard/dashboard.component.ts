import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';
import { SettingService } from '../settings/setting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // head:string=''
  settings:any;
  constructor(library:FaIconLibrary, private headername: HeaderService, private settingBackend:SettingService) {
    library.addIcons(
      faPlus
    )
    this.headername.changeheader("Dashboard")

   }

  ngOnInit(): void {
    this.settingBackend.getsettings().subscribe((response)=>{
      this.settings = response
      console.log("this.settings", this.settings);
      localStorage.setItem('client',this.settings[0]['client']);
      localStorage.setItem('project', this.settings[0]['project'])

    });
  }


}
