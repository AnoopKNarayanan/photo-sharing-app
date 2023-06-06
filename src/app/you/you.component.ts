import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-you',
  templateUrl: './you.component.html',
  styleUrls: ['./you.component.css']
})
export class YouComponent implements OnInit, AfterContentChecked {

  photos$!: Observable<any>;
  reload$ = this.sharedService.reload$;
  loading$ = this.sharedService.loading$;

  constructor(private sharedService: SharedService, private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPhotos();
    this.reload$.subscribe(res => {
      if(res)
        this.getPhotos();
    });
  }

  getPhotos() {
    this.photos$ = this.sharedService.getUserPhotos();
  }

  reload(event: any){
    this.getPhotos();
  }

  deletePhoto(id: String) {
    this.sharedService.deletePhoto(id).subscribe(res => {
      if(res.status){
        this.getPhotos();
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

}
