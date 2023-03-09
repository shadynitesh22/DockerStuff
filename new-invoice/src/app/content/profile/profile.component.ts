import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBars, faChessBoard, faEnvelope, faHome, faMapMarkedAlt, faMapMarkerAlt, faMapPin, faPencilAlt, faPhone, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from 'src/app/layout/header/header.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private library: FaIconLibrary, private headername: HeaderService) {
    library.addIcons(
      faBars, faSearch,
      faHome, faFacebookF, faTwitter,
      faInstagram, faUser, faEnvelope,
      faPhone, faHome,faChessBoard, faMapMarkedAlt,
      faMapPin, faMapMarkerAlt, faPencilAlt

    )

    this.headername.changeheader("Profile")
   }

  ngOnInit(): void {
  }

}
