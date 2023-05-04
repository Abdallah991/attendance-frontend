import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SelectData } from 'src/app/interfaces/interfaces';

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
  @Output() itemClicked = new EventEmitter<any>();
  @Output() searchClicked = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<string>();

  @Input() results: SelectData[] = [];
  @Input() showResults: boolean = false;
  @Input() loader: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  clickItem = (id) => this.itemClicked.emit(id);

  searhcValue() {
    // TODO: add implmntation if needed
    console.log('search clicked!');
    this.searchClicked.emit(this.searchValue);
  }

  cancelSearchMode() {
    this.cancel.emit();
  }

  studentClicked($event) {
    this.itemClicked.emit($event['id']);
  }
}
