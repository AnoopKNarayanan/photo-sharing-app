import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { UserCredentials } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm: UserCredentials = new UserCredentials();
  isError: Boolean = false;
  errorMsg: String = '';

  constructor(private sharedService: SharedService, private router: Router) {}

  onSubmit(loginForm: any) {
    var userCreds: UserCredentials = loginForm.value;
    this.sharedService.login(userCreds).subscribe({
      next: (res) => {
        if(res && res['token']){
          this.sharedService.setToken(res['token']);
          this.router.navigateByUrl('/dashboard');
        }
        else {
          this.isError = true;
          this.errorMsg = 'Unable to login';
        }          
      },
      error: (error) => {
        this.isError = true;
        this.errorMsg = error.error.message;
      }      
    });
  }

  removeErrors() {
    this.isError = false;
    this.errorMsg = '';
  }

}
