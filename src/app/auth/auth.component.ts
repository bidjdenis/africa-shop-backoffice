import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { TokenStorageService } from './service/token-storage.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('password') password: ElementRef | undefined;
  formLogin!: FormGroup;
  constructor(private tokenStorageService: TokenStorageService, private formBuilder: FormBuilder, private loginService: AuthService, private cdr: ChangeDetectorRef,) { }


  isLoading: boolean = false;
  toggleEyes: boolean = false;
  alert: { isAlert: boolean, title?: string, description?: string } = { isAlert: false };
  userInfos: any;
  loader: boolean = false;

  ngOnInit(): void {
    this.listOrInitForm()
  }
  listOrInitForm() {
    this.initForm()
  }
  login() {

    if (this.formLogin.valid) {
      this.isLoading = true
      setTimeout(() => {
        this.loginService.login(this.formLogin!.value).subscribe({
          next: loginResponse => {
            this.isLoading = false;
            this.alert = { isAlert: false }
            this.tokenStorageService.saveToken(loginResponse.data.access_token as string)

            this.cdr.detectChanges()
            window.location.href = '/home';

          },
          error: (err) => {
            this.alert = {
              isAlert: true,
              title: "Echec de connexion !",
              description: "Login ou mot de passe incorrect"
            }
            this.isLoading = false;
            this.cdr.detectChanges()

          },
          complete: () => {
            this.isLoading = false;
            this.cdr.detectChanges()
          }
        })

      }, 1000);
    }
  }


  initForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit() {
    console.log("form", this.formLogin!.value)
    this.login()
  }


}
