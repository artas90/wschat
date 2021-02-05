import { merge, Observable } from 'rxjs';
import { scan, startWith, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';

export interface IUserMessage {
  text: any;
  from: any; 
  created: any;
}

const MESSAGES = {
  left: 'User left: ',
  joined: 'User joined: ',
}

@Injectable()
export class MessagesService {
  list$: Observable<IUserMessage[]> = this.socket.fromEvent("message").pipe(
    scan((acc, val) => [...acc, val], []),
    startWith([]),
  );

  nicknames$: Observable<string[]> = merge(
    this.getCurrentNicknames(),
    this.list$.pipe(map(msgs => this.mapNicknames(msgs)))
  )

  constructor(
    private httpClient: HttpClient,
    private socket: Socket,
    private matSnackBar: MatSnackBar,
  ) {
    this.initUsersChanged();
  }

  addMessage(text) {
    this.socket.emit('add-message', { text }); 
  }

  setNickname(nickname) {
    this.socket.connect();
    this.socket.emit('set-nickname', nickname);
  }

  private getCurrentNicknames() {
    return this.httpClient.get<string[]>(environment.SERVER_CONF.url + '/nicknames').pipe(startWith([]));
  }

  private initUsersChanged() {
    this.socket.on('users-changed', (data) => {
      const user = data.user || 'Anonymous';
      const msg = MESSAGES[data.event];
      if (msg) {
        console.log(msg + user);
        this.matSnackBar.open(msg + user);
      }
    });
  }

  private mapNicknames(messages: IUserMessage[]) {
    const list = messages.map(m => m.from);
    return [...new Set(list)];
  }
}
