import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Event} from "../model/event.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  host: string = 'localhost:8050'
  baseUrl: string = this.host +'/evento';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.host +'/login', loginPayload);
  }

  signin(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.host +'/signin', loginPayload);
  }

  getEvents() : Observable<ApiResponse> {
    const payload: any = {username: window.localStorage.getItem('token')};
    return this.http.post<ApiResponse>(this.baseUrl + 's', payload);
  }

  getEventById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + '/' + id);
  }

  createEvent(event: Event): Observable<ApiResponse> {
    event.username = window.localStorage.getItem('token');
    console.log(event);
    return this.http.post<ApiResponse>(this.baseUrl, event);
  }

  updateEvent(event: Event): Observable<ApiResponse> {
    event.username = window.localStorage.getItem('token');
    return this.http.put<ApiResponse>(this.baseUrl + '/' + event.id, event);
  }

  deleteEvent(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/' + id);
  }
}
