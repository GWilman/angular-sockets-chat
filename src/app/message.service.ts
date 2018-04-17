import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  saveMessage(message) {
    return this.http.post('http://localhost:4000/api/messages', message);
  }

}
