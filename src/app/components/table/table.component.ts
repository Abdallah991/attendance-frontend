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
  // currentPage
  @Input() currentPage: number = 1;
  @Output() forward = new EventEmitter<number>();
  @Output() backward = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    // Pagination
    // get the number of pages
    // pagination action
    this.paginateAction();
    // console.log(this.data);
  }

  // edit click implementation
  clickEdit = (id) => this.editClicked.emit(id);

  // delete click implementation
  clickDelete = (id) => this.deleteClicked.emit(id);

  // search functionality
  // pagination variables
  // currentPage = 1;
  FORWARD = true;
  BACKWARD = false;
  dataShown: TableData[] = [];

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
    this.backward.emit(this.currentPage);
    this.paginateAction();
  }

  // pagination forward action
  nextButton() {
    this.forward.emit(this.currentPage);
    this.paginateAction();
  }

  // pagination click action
  paginateAction() {
    // // data shown formula
    this.dataShown = this.data;
    // this.dataShown = this.data.slice(
    //   (this.currentPage - 1) * 10,
    //   this.currentPage * 10 - 1
    // );
    // disable buttons conditions on change
    this.FORWARD = this.numberOfPages > this.currentPage ? false : true;
    this.BACKWARD = this.currentPage > 1 ? false : true;
    this.showPagination = true;
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
            // Add only unique items
            // if the array is empty, add the item
            // if (this.dataShown.length == 0) {
            //   this.dataShown.push(items);
            // } else {
            //   // if the array is not empty
            //   var found = false;
            //   // check if it exist
            //   this.dataShown.forEach((element) => {
            //     // if element exist
            //     if (element.id === items.id) {
            //       found = true;
            //     }
            //   });
            // if element dont, add it
            // if (!found) {
            //   this.dataShown.push(items);
            // }
            // }
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
}
