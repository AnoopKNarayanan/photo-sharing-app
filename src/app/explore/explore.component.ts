import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, AfterContentChecked {

  users$!: Observable<any>;
  loading$ = this.sharedService.loading$;

  constructor(private sharedService: SharedService, private cdref: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.getSharedPhotos();
  }

  getSharedPhotos() {
    this.users$ = this.sharedService.getSharedPhotos();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
