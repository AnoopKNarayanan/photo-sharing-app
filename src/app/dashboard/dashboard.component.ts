import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterContentChecked {

  userData$!: Observable<any>;
  users$!: Observable<any>;
  loading$ = this.sharedService.loading$;
  
  constructor(private sharedService: SharedService, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.users$ = this.sharedService.getUsersToFollow();
  }

  getUserProfile(){
    this.userData$ = this.sharedService.getUserProfile();
  }

  follow(id: String, isFollow: Boolean) {
    this.sharedService.followUser(id, isFollow).subscribe(res => {
      if(res.status)
        this.getUserProfile();
    })
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
