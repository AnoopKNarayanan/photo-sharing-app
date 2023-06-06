import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreComponent } from './explore.component';
import { of } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { Photo, User } from '../models/user';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;
  let sharedServiceMock: any;

  beforeEach(async () => {
    sharedServiceMock = {
      getSharedPhotos: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ ExploreComponent ],
      providers: [
        {
          provide: SharedService, useValue: sharedServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getSharedPhotos', () => {
    const photo: Photo = {
      name: 'test.jpg',
      data: new Buffer('ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00')
    }
    const user: User = {
      _id: '5dbff32e367a343830cd2f52',
      name: "Test User",
      photos: [photo]
    }
    const res = {
      status: true,
      users: [user]
    }
    jest.spyOn(sharedServiceMock, 'getSharedPhotos').mockReturnValue(of(res));
    component.getSharedPhotos;
    expect(sharedServiceMock.getSharedPhotos).toHaveBeenCalled();
  });
});
