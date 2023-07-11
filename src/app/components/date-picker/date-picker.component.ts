import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  // min date value
  @Input() min: Date;
  //  form group and form control value
  @Input() FGN: FormGroup;
  @Input() FCN: string;
  // label
  @Input() label: string = 'Date';
  //  event emitter
  @Output() onChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    //  set value of date on initialization
    if (this.FGN.value[this.FCN]) {
      this.FGN.controls[this.FCN].setValue(new Date(this.FGN.value[this.FCN]));
    }
  }

  // date selection event emitter
  onDateChange = (data) => {
    var date = formatDate(data.value, 'yyyy-MM-dd', 'en_US');
    this.onChange.emit(date);
  };
}
