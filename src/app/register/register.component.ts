import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm: User = new User();
  passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  isSuccess = false;
  isError = false;

  constructor(private sharedService: SharedService) {}

  onSubmit(registerForm: any) {
    var user: User = registerForm.value;
    this.sharedService.register(user).subscribe({
        next: (res) => {
          if(res.status){
            this.isSuccess = true;
            registerForm.resetForm();
          }
          else
            this.isError = true;
        },
        error: (e) => this.isError = true
    });
  }

}
