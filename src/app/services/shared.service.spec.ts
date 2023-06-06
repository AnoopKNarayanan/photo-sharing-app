import { of } from 'rxjs';
import { Photo, SharedPhotoResponse, User, UserCredentials } from '../models/user';
import { UserProfileResponse } from '../models/user';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    }
    service = new SharedService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getUserProfile', () => {
    const res: UserProfileResponse = {
      status: true,
      user: new User()
    }
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getUserProfile();
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should test getUserPhotos', (done) => {
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
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getUserPhotos().subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should test getUsersToFollow', (done) => {
    var users: Array<User> = new Array();
    users.push({
      _id: '5dbff32e367a343830cd2f52',
      name: "Test User"
    });
    const res = {
      status: true,
      users: users
    }
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getUsersToFollow().subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should test getSharedPhotos', (done) => {
    const photo: Photo = {
      name: 'test.jpg',
      data: new Buffer('ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00')
    }
    var users: Array<User> = new Array();
    users.push({
      _id: '5dbff32e367a343830cd2f52',
      name: "Test User",
      photos: [photo]
    });
    const res: SharedPhotoResponse = {
      status: true,
      users: users
    }
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getSharedPhotos().subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should test register', (done) => {
    const user: User = {
      _id: '5dbff32e367a343830cd2f52',
      email: "test@abc.com",
      name: "Test User",
      password: "Test@123"
    }
    const res = {
      status: true,
      message: 'User registered successfully'
    }
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.register(user).subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should test login', (done) => {
    const user: UserCredentials = {
      email: "test@abc.com",
      password: "Test@123"
    }
    const res = {
      token: 'testToken'
    }
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.login(user).subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should test upload', (done) => {
    var formData: FormData = new FormData();
    formData.append("thumbnail", 'test.jpg');
    const res = {
      status: true,
      message: 'Uploaded succesfully'
    }
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.upload(formData).subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should test followUser', (done) => {
    const res = {
      status: true,
      message: 'Followed succesfully'
    }
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.followUser('5dbff32e367a343830cd2f52', true).subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should test deletePhoto', (done) => {
    const res = {
      status: true,
      message: 'Deleted succesfully'
    }
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.deletePhoto('5dbff32e367a343830cd2f52').subscribe({
      next: data => {
        expect(data).toEqual(res);
        done();
      },
      error: error => console.log(error)
    });

    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should test isLoggedIn', () => {
    var res = service.isLoggedIn();
    expect(res).toBe(false);
  });

});
