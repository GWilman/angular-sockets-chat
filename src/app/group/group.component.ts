import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as io from 'socket.io-client';

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
  groupId: String;
  userId: String;
  now: any;
  newMessage: String;
  websocket = io('http://localhost:4000');

  ngOnInit() {
    const userId = this.authService.getPayload().userId;
    const groupId = this.route.snapshot.paramMap.get('id');
    this.userId = userId;
    this.groupId = groupId;
    this.getGroup(groupId);
    this.now = moment();
    this.newMessage = '';
    this.websocket.on('connect', () => {
      console.log(`Socket ID: ${this.websocket.id} connected`);
      console.log('USER ID', userId);
      this.websocket.emit('set user', { groupId, userId });
    });
    this.websocket.on('message sent', data => {
      console.log('received message', data);
      this.getGroup(this.groupId);
    })
  }

  getGroup(id): void {
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
      group: this.groupId,
      user: this.userId,
      content: this.newMessage
    }

    this.messageService.saveMessage(message)
      .subscribe((res: any) => {
        this.getGroup(this.groupId)
        this.websocket.emit('message sent', message);
      });


    this.newMessage = '';
  }

}
