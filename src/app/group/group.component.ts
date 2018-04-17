import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { AuthService } from '../auth.service';
import { GroupService } from '../group.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

export class GroupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private messageService: MessageService,
    private authService: AuthService) { }

  group: {};
  now: any;
  newMessage: String;

  ngOnInit() {
    this.getGroup();
    this.now = moment();
    this.newMessage = '';
    console.log(this.authService.getPayload().userId);
  }

  getGroup(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe((res: any) => {
        res.createdAt = moment(res.createdAt).format('Do MMMM YYYY');
        res.messages.forEach(message => {
          message.createdAt = moment(message.createdAt).fromNow();
        })
        this.group = res;
      },
    error => console.error(error));
  }

  sendMessage(): void {
    const message = {
      user: this.authService.getPayload().userId,
      group: this.group,
      content: this.newMessage
    }

    this.messageService.sendMessage(message)
      .subscribe((res: any) => this.getGroup());

    this.newMessage = '';
  }

}
