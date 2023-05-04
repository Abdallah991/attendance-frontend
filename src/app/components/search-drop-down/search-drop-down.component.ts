import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'search-drop-down',
  templateUrl: './search-drop-down.component.html',
  styleUrls: ['./search-drop-down.component.scss'],
})
export class SearchDropDownComponent implements OnInit {
  // Form group
  @Input()
  FGN!: UntypedFormGroup;
  // from control name
  @Input()
  FCN!: string;
  @Input() searchValue: string = '';
  @Output() itemClicked = new EventEmitter<string>();
  @Output() searchClicked = new EventEmitter<string>();

  @Input() results = ['ahmed', 'Sameer', 'jasmine'];

  constructor() {}

  ngOnInit(): void {}

  clickItem = (id) => this.itemClicked.emit(id);

  searhcValue() {
    // TODO: add implmntation if needed
    console.log('search clicked!');
    this.searchClicked.emit(this.searchValue);
  }
}
