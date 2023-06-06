import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { SharedService } from '../services/shared.service';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let sharedServiceMock: any;

  beforeEach(async () => {
    sharedServiceMock = {
      register: jest.fn()
    }
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RegisterComponent ],
      providers: [
        {
          provide: SharedService, useValue: sharedServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register', () => {
    const res = {
      status: true,
      message: 'User registered successfully'
    }
    const registerForm = <NgForm>{
      value: {
        name: "Test User",
        email: "test@abc.com",
        password: "Test@123"
      }
    };
    jest.spyOn(sharedServiceMock, 'register').mockReturnValue(of(res));
    component.onSubmit(registerForm);
    expect(sharedServiceMock.register).toHaveBeenCalled();
  });
});
