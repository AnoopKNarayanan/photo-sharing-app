import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SharedService } from '../services/shared.service';
import { of } from 'rxjs';
import { User } from '../models/user';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let sharedServiceMock: any;

  beforeEach(async () => {
    sharedServiceMock = {
      getUsersToFollow: jest.fn(),
      getUserProfile: jest.fn(),
      followUser: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {
          provide: SharedService, useValue: sharedServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getUserProfile', () => {
    const user: User = {
      _id: '5dbff32e367a343830cd2f52',
      email: "test@abc.com",
      name: "Test User",
    }
    const res = {
      status: true,
      user: user
    }
    jest.spyOn(sharedServiceMock, 'getUserProfile').mockReturnValue(of(res));
    component.getUserProfile
    expect(sharedServiceMock.getUserProfile).toHaveBeenCalled();
  });

  it('should follow', () => {
    const res = {
      status: true,
      message: 'Followed succesfully'
    }
    jest.spyOn(sharedServiceMock, 'followUser').mockReturnValue(of(res));
    component.follow('5dbff32e367a343830cd2f52', true);
    expect(sharedServiceMock.getUserProfile).toHaveBeenCalled();
  });
});
