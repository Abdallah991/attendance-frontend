import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-decision-dialog',
  templateUrl: './decision-dialog.component.html',
  styleUrls: ['./decision-dialog.component.scss'],
})
export class DecisionDialogComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      comment: ['', Validators.required],
    });
  }
  // dialog content
  @Input() dialogId: string;
  @Input() title: string = 'This candidate s';
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
  @Output() confirm = new EventEmitter<any>();
  //  form
  form: FormGroup;
  // decision
  decision = '-';

  ngOnInit(): void {}

  radioClicked($event) {
    // const selectedValue = ($event.target as HTMLInputElement).value;
    console.log($event.target.value);
    this.decision = $event.target.value;
  }

  confirmClick() {
    var data = {
      comment: this.form.controls.comment.value,
      decision: this.decision,
    };
    this.confirm.emit(data);
  }

  // cancel dialog emitter
  cancelClick() {
    this.dismissed.emit(true);
  }
}
