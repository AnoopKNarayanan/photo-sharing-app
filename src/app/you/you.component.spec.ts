import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouComponent } from './you.component';
import { of } from 'rxjs';
import { Photo, User, UserProfileResponse } from '../models/user';
import { SharedService } from '../services/shared.service';

describe('YouComponent', () => {
  let component: YouComponent;
  let fixture: ComponentFixture<YouComponent>;
  let sharedServiceMock: any;

  beforeEach(async () => {
    sharedServiceMock = {
      getUserPhotos: jest.fn(),
      deletePhoto: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ YouComponent ],
      providers: [
        {
          provide: SharedService, useValue: sharedServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getPhotos', () => {
    const photo: Photo = {
      name: 'test.jpg',
      data: new Buffer('ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00')
    }
    const user: User = {
      _id: '5dbff32e367a343830cd2f52',
      email: "test@abc.com",
      name: "Test User",
      photos: [photo]
    }
    const res: UserProfileResponse = {
      status: true,
      user: user
    }
    jest.spyOn(sharedServiceMock, 'getUserPhotos').mockReturnValue(of(res));
    component.getPhotos;
    expect(sharedServiceMock.getUserPhotos).toHaveBeenCalled();
  });

  it('should deletePhoto', () => {
    const res = {
      status: true, 
      message: 'Deleted succesfully'
    }
    jest.spyOn(sharedServiceMock, 'deletePhoto').mockReturnValue(of(res));
    component.deletePhoto('5dbff32e367a343830cd2f52');
    expect(sharedServiceMock.deletePhoto).toHaveBeenCalled();
  });
});
