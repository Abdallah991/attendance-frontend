import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements OnInit {
  // place holder value
  @Input() placeholder: string = 'Select an Option';
  //  form group and form control
  @Input() FGN!: FormGroup;
  @Input() FCN: string;
  //  data
  @Input() data: SelectData[];
  //  multiple or single selection
  @Input() multiple: boolean = false;
  //  pre set value
  @Input() preSetValue: string | number;
  // selection event emitter
  @Input() prefix: string;
  // Disable
  @Input() disabled: boolean = false;

  @Output() changed = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  // on selection click
  emitChange = (event) => {
    console.log(event.target.value);
    this.changed.emit(event.target.value);
  };
}
