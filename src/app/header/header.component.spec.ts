import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { of } from 'rxjs';
import { SharedService } from '../services/shared.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sharedServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    sharedServiceMock = {
      upload: jest.fn(),
      deleteToken: jest.fn()
    };
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {
          provide: SharedService, useValue: sharedServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onFileSelected', () => {
    const res = {
      status: true,
      message: 'Uploaded succesfully'
    }
    const formData = new FormData();
    formData.append("thumbnail", 'test.jpg');
    jest.spyOn(sharedServiceMock, 'upload').mockReturnValue(of(res));
    component.onFileSelected;
    expect(sharedServiceMock.upload).toHaveBeenCalled();
  });

  it('should logout', () => {
    jest.spyOn(sharedServiceMock, 'deleteToken');
    jest.spyOn(routerMock, 'navigateByUrl');
    component.logout;
    expect(sharedServiceMock.deleteToken).toHaveBeenCalled();
  });
});
