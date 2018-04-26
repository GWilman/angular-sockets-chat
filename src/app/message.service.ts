import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  saveMessage(message) {
    return this.http.post('http://localhost:4000/api/messages', message);
  }

  editMessage(message, messageId) {
    return this.http.put(`http://localhost:4000/api/messages/${messageId}`, message);
  }

  deleteMessage(messageId) {
    return this.http.delete(`http://localhost:4000/api/messages/${messageId}`);
  }

}
