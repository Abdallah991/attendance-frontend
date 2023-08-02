import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { STUDENT_HEADER } from 'src/app/constants/headers';
import { TableData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  // table columns
  @Input() columns: string[] = STUDENT_HEADER;
  @Input() actionButtons: boolean = true;

  //  table data
  @Input() data: TableData[] = [
    { id: '1', data: [1, 'Abdallah', '12/10/2020', 'first'] },
  ];
  // edit and delete emitters
  @Output() editClicked = new EventEmitter<string>();
  @Output() deleteClicked = new EventEmitter<string>();
  //  search value
  @Input() searchValue: string;
  // number of pages
  @Input() numberOfPages: number;
  // show pagination
  @Input() showPagination: boolean = false;
  // disable pagination forward
  @Input() disableForward: boolean = true;
  // disable paginationbackward
  @Input() disableBackward: boolean = false;
  // currentPage
  @Input() currentPage: number = 1;
  // pagination laoder
  @Input() loader: boolean = false;

  // ?  pagination
  @Output() forward = new EventEmitter<number>();
  @Output() backward = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  // edit click implementation
  clickEdit = (id) => this.editClicked.emit(id);

  // delete click implementation
  clickDelete = (id) => this.deleteClicked.emit(id);

  // on change, fire search function
  ngOnChanges(changes: SimpleChanges) {
    // if search value is defined
    if (changes.searchValue?.currentValue != undefined) {
      // trigger search function
      this.search(changes.searchValue?.currentValue);
    }
    // if data passed changes and is defined
    if (changes.data?.currentValue != undefined) {
      // number of pages calculation
      // this.numberOfPages = Math.ceil(this.data.length / 10);
      //  pagination action
      this.paginateAction();
      // trigger search if search value is defined
      if (changes.searchValue?.currentValue != undefined) {
        this.search(changes.searchValue?.currentValue);
      }
    }
  }
  // pagination back action
  backButton() {
    if (this.currentPage >= 2) {
      this.currentPage--;
    }
    // if (this.currentPage > 2) {
    //   this.currentPage--;
    // }
    this.backward.emit(this.currentPage);
    // this.dataShown = this.data;
    this.paginateAction();
  }

  // pagination forward action
  nextButton() {
    if (this.currentPage >= 1) {
      this.currentPage++;
    }
    this.forward.emit(this.currentPage);
    this.paginateAction();
    // this.dataShown = this.data;
  }

  // pagination click action
  paginateAction() {
    switch (this.currentPage) {
      // first page
      case 1:
        this.disableBackward = true;
        if (this.currentPage == this.numberOfPages) {
          this.disableForward = true;
        } else {
          this.disableForward = false;
        }
        break;
      // case of the current page being equal to the number of pages
      case this.numberOfPages:
        this.disableForward = true;
        this.disableBackward = false;
        break;
      // every time
      default:
        this.disableForward = false;
        this.disableBackward = false;
    }
  }

  // search functionality
  async search(value: string) {
    // account for uppercase characters
    var valueLowerCase = value.toLowerCase();
    // this.dataShown = [];
    // if search value is neither null nor empty string
    if (valueLowerCase != null && valueLowerCase != '') {
      //  loop through the values
      for await (let items of this.data) {
        for await (let data of items.data) {
          // account for uppercase characters
          var dataToLowerCase = String(data).toLowerCase();
          if (dataToLowerCase.includes(valueLowerCase)) {
          }
        }
      }

      this.searchPaginationAction();
    } else {
      this.paginateAction();
    }
  }

  // search pagination action
  searchPaginationAction() {
    // remove pagination
    this.showPagination = false;
  }

  checkString(item) {
    switch (item) {
      case 'Registered to check-in':
        return 'text-green';

      case 'At administration':
      case 'At games':
        return 'text-orange';

      case 'Registered to bh-module':
      case 'Registered to bh-piscine':
      case 'Registered to quad':
        return 'text-gray-light';
    }
    return '';
  }
}
