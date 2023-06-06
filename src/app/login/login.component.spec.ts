import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedService } from '../services/shared.service';
import { of } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let sharedServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    sharedServiceMock = {
      login: jest.fn()
    };
    routerMock = {
      navigateByUrl: jest.fn()
    }
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: SharedService, useValue: sharedServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const res = {
      token: 'testToken'
    }
    const loginForm = <NgForm>{
      value: {
        email: "test@abc.com",
        password: "Test@123"
      }
    };
    jest.spyOn(sharedServiceMock, 'login').mockReturnValue(of(res));
    jest.spyOn(routerMock, 'navigateByUrl');
    component.onSubmit(loginForm);
    fixture.detectChanges();
    expect(sharedServiceMock.login).toHaveBeenCalled();
  });

});
