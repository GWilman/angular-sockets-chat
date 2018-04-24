import { Component, OnInit, OnDestroy } from '@angular/core';
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

  group: any;
  groupId: String;
  userId: String;
  now: any;
  newMessage: String;
  websocket = io('http://localhost:4000');
  currentUsers: {};

  ngOnInit() {
    const userId = this.authService.getPayload().userId;
    const groupId = this.route.snapshot.paramMap.get('id');
    this.userId = userId;
    this.groupId = groupId;
    this.getGroup(groupId);
    this.now = moment();
    this.newMessage = '';
    this.checkStatus();

    this.websocket.on('connect', () => {
      console.log(`Socket ID: ${this.websocket.id} connected`);
      // console.log('USER ID', userId);
      this.websocket.emit('set user', { groupId, userId });
    });

    this.websocket.on('update users', data => {
      this.currentUsers = data;
    })

    this.websocket.on('message sent', () => {
      this.getGroup(this.groupId);
    });

    this.websocket.on('user disconnected', socketId => {
      // this.checkStatus();
      console.log('socketId:', socketId);
      this.messageService.saveMessage({
        group: this.groupId,
        user: this.currentUsers[socketId],
        content: 'I\'m leaving now, bye!'
      })
        .subscribe((res: any) => {
          this.getGroup(this.groupId);
          this.websocket.emit('message sent');
        });

      delete this.currentUsers[socketId];
      this.websocket.emit('remove user', this.currentUsers);
    });
  }

  ngOnDestroy() {
    this.websocket.disconnect(true);
  }

  getGroup(id): void {
    this.groupService.getGroup(id)
      .subscribe((res: any) => {
        res.createdAt = moment(res.createdAt).format('Do MMMM YYYY');
        res.messages.forEach(message => {
          message.createdAt = moment(message.createdAt).fromNow();
        })
        res.messages = res.messages.reverse();
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
        this.getGroup(this.groupId);
        this.websocket.emit('message sent');
      });


    this.newMessage = '';
  }

  checkStatus(): void {
    setInterval(() => {
      const sockets = Object.keys(this.currentUsers);
      for (let userSocket in this.currentUsers) {
        if (sockets.includes(userSocket)) {
          const user = this.group.users.find(user => user._id === this.currentUsers[userSocket]);
          user.isOnline = true;
        }
      }
    }, 1000);
  }

}
