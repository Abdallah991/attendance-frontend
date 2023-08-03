import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  // dialog controller
  @Input() editText: boolean = false;

  // message
  @Input() message: string =
    "You've been selected for a chance to get one year of subscription to use Wikipedia for free!";
  //  event emitters
  @Output() dismissed = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<boolean>();

  // !

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  //  confirm dialog emitter
  confirmClick() {
    if (this.editText) {
      this.confirm.emit(this.form.controls.comment.value);
    } else {
      this.confirm.emit(true);
    }
  }

  // cancel dialog emitter
  cancelClick() {
    this.dismissed.emit(true);
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
