import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private groupService: GroupService,
    private router: Router) { }

  groups: {} = [];

  ngOnInit() {
    this.getGroups();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getGroups(): void {
    this.groupService.getGroups()
      .subscribe(res => {
        console.log(res);
        this.groups = res;
      })
  }

}
