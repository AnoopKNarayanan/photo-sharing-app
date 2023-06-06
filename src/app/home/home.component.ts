import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private sharedService: SharedService, private router:  Router) {}

  ngOnInit(): void {
  }

  signUp() {
    this.router.navigateByUrl('/register');
  }

}
