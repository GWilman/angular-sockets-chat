import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get('http://localhost:4000/api/groups');
  }

}
