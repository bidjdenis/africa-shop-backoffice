import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { TokenStorageService } from 'src/app/auth/service/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfos: any;

  constructor(private tokenService: TokenStorageService, private router: Router, private loginService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getUser() {
    this.loginService.getUser().subscribe((response: any) => {
      this.userInfos = response.data;
      console.log("User infos", this.userInfos)
    //  this.tokenStorageService.saveUserInfos(JSON.stringify(this.userInfos));
    });
  }

}
