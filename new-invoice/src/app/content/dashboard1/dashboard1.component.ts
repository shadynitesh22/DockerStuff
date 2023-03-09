import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/layout/header/header.service';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {

  constructor(private headername:HeaderService) {
    this.headername.changeheader("Dashboard1")

  }

  ngOnInit(): void {
  }

}
