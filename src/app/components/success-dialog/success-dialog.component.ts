import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
})
export class SuccessDialogComponent implements OnInit {
  // dialog content
  @Input() dialogId: string;
  @Input() title: string = 'Congratulations random Interner user!';
  // dialog buttons
  @Input() dismiss: string = 'Dismiss';
  @Input() action: string = 'Confirm';
  // dialog controller
  @Input() twoButtons: boolean = false;
  // message
  @Input() message: string =
    "You've been selected for a chance to get one year of subscription to use Wikipedia for free!";
  //  event emitters
  @Output() dismissed = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<boolean>();
  // !

  constructor() {}

  ngOnInit(): void {}

  //  confirm dialog emitter
  confirmClick() {
    this.confirm.emit(true);
  }

  // cancel dialog emitter
  cancelClick() {
    this.dismissed.emit(true);
  }
}
