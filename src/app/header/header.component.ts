import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  fileName: String = '';

  constructor(private sharedService: SharedService, public router: Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        this.sharedService.upload(formData).subscribe(res => {
          if(res.status){
            if(this.router.url == '/you')
              this.sharedService.reloadPage();
            else
              this.router.navigateByUrl('/you');
          }            
        });
    }
  }

  logout() {
    this.sharedService.deleteToken();
    this.router.navigateByUrl('/login');
  }

}
