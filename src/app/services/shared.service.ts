import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedPhotoResponse, User, UserCredentials, UserProfileResponse } from '../models/user';
import { BehaviorSubject, Observable, catchError, map } from  'rxjs';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly apiBaseUrl = 'http://localhost:3000/api';
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })};

  private reload = new BehaviorSubject<Boolean>(false);
  public readonly reload$ = this.reload.asObservable();

  private loading = new BehaviorSubject<Boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(this.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  login(userCreds: UserCredentials): Observable<any> {
    return this.http.post(this.apiBaseUrl + '/authenticate', userCreds, this.noAuthHeader);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<UserProfileResponse>(this.apiBaseUrl + '/userProfile');
  }

  getUserPhotos(): Observable<any> {
    return this.http.get<UserProfileResponse>(this.apiBaseUrl + '/fetchUserPhotos').pipe(
      map((res) => {
        res.user.photos?.forEach(photo => {
          const buffer = Buffer.from(photo.data);
          const base64String = buffer.toString('base64');
          photo.data = base64String;
        });
        return res;
      })
    );
  }

  getUsersToFollow(): Observable<any> {
    return this.http.get(this.apiBaseUrl + '/fetchUsersToFollow');
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post(this.apiBaseUrl + '/upload', formData);
  }

  followUser(id: String, isFollow: Boolean): Observable<any> {
    const body = {
      'id': id,
      'follow': isFollow
    }
    return this.http.post(this.apiBaseUrl + '/follow', body);
  }

  deletePhoto(id: String): Observable<any> {
    const body = {
      'id': id
    }
    return this.http.post(this.apiBaseUrl + '/deletePhoto', body);
  }

  getSharedPhotos(): Observable<any> {
    return this.http.get<SharedPhotoResponse>(this.apiBaseUrl + '/fetchSharedPhotos').pipe(
      map((res) => {
        res.users?.forEach(user => {
          user.photos?.forEach(photo => {
            const buffer = Buffer.from(photo.data);
            const base64String = buffer.toString('base64');
            photo.data = base64String;
          });
        });        
        return res;
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  private getUserPayload() {
    var token = this.getToken();
    if(token) {
      var payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    }
    else
      return null
  }

  isLoggedIn() {
    var payload = this.getUserPayload();
    if(payload)
      return payload.exp > Date.now() / 1000;
    else
      return false;
  }

  reloadPage() {
    this.reload.next(true);
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
