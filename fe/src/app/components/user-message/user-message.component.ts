import { Component, Input } from '@angular/core';
import { IUserMessage } from '../../services/messages.service';

@Component({
  selector: 'wsc-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent {
  @Input() message: IUserMessage;
  @Input() isOdd: boolean;
}
