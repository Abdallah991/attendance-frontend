import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { STUDENT_HEADER } from 'src/app/constants/headers';
import {
  SelectData,
  TableButtonOptions,
  TableData,
} from 'src/app/interfaces/interfaces';
import { StudentsService } from './services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private SS: StudentsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchInput: ['', Validators.required],
    });
  }

  students = [];
  // table data
  data: TableData[] = [];
  // table columns
  columns: string[] = STUDENT_HEADER;
  // ? pagination variables
  // number of pages
  numberOfPages: number = 1;
  // number of pages
  nextPage: number = 1;
  // number of pages
  previousPage: number = 1;
  // number of pages
  currentPage: number = 1;
  // Show add button if no students have been added
  showAddButton: boolean = false;
  // pagination loader
  loader: boolean = false;
  // disable pagination for the table
  disableForward = false;
  disableBackward = true;
  searchForm: FormGroup;
  searchValues: SelectData[] = [];
  // search loader
  searchLoader: boolean = false;
  showResults: boolean = false;
  // confirmation dialog
  dialogTitle = 'Are you sure you want to delete this Student?';
  message = 'This action is permanent';
  button = 'Dismiss';
  button2 = 'Confirm';
  // delete student id
  deleteId = null;

  ngOnInit(): void {
    this.getTableData();
  }

  // TODO: make sure that this function works properly and loads the data
  getTableData() {
    this.AR.data.subscribe((response: any) => {
      this.students = response.students.data.students;
      if (this.students.length > 0) {
        this.data = this.constructTableData(this.students);
      } else {
        this.showAddButton = true;
      }
    });
  }

  // make table data
  constructTableData(students: any[]): TableData[] {
    var sequence = 0;
    return students.map((res) => {
      sequence++;
      console.log(res);
      return {
        // the id, to return back for edit or delete events
        id: res['id'],
        // the data displayed in each row
        data: [
          sequence,
          res['id'],
          res['firstName'] + ' ' + res['lastName'],
          // ! replace it with actual value of cohort
          'First',
          res['phone'],
          res['platformId'],
        ],
        // the action buttons
        actionButtons: this.constructTableButton(),
      };
    });
  }

  // make row buttons
  constructTableButton(): TableButtonOptions {
    return {
      // edit button
      edit: {
        isActive: true,
        text: 'View',
      },
      // delete button
      delete: {
        isActive: true,
        text: 'Delete',
      },
    };
  }

  // click forward implementaton
  async forawrdPagination($page) {
    // TODO: Implement the search
  }

  // click backward implementaton
  // accepts the number of page
  async backwardPagination($page) {
    this.disableBackward = true;
    this.loader = true;
    // TODO: check pagination later
  }

  viewCandidate(id) {
    this.router.navigateByUrl('/students/view-student/' + id);
  }

  // search button implementation
  search() {
    // TODO: search functionality for the students
    this.searchLoader = true;
    this.searchValues = [];
    var searchValue = this.searchForm.controls.searchInput.value;
    if (searchValue != undefined && searchValue != '' && searchValue != null) {
      // TODO: put back like promise syntax
      // TODO: show no results when there is no results
      var searchInput = {
        searchValue: searchValue,
      };
      this.SS.searchStudent(searchInput)
        .then((student) => {
          this.students = student;
          this.data = this.constructTableData(this.students);
        })
        .catch((err) => {
          console.log('Erro response :', err);
        })
        .finally(() => {
          this.searchLoader = false;
        });
    } else {
      this.getTableData();
      this.searchLoader = false;
    }
  }

  // TODO:
  cancelSearch() {
    this.getTableData();
    this.searchLoader = false;
    this.showResults = false;
    this.searchForm.controls.searchInput.setValue(null);
  }

  addStudents() {
    // TODO: add student form
    this.router.navigateByUrl('/students/add-student');
  }

  confirmDelete() {
    this.loader = true;
    this.SS.deleteStudent(this.deleteId)
      .then((res) => {
        this.deleteId = null;
        this.getTableData();
        this.loader = false;
      })
      .catch((err) => {
        console.log('the api failed :', err);
        this.deleteId = null;
      });
  }

  deleteStudent($event) {
    this.deleteId = $event;
    this.showDialog();
  }

  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  // TODO: Invoke sync attendace api
  async birthdayPage() {
    this.router.navigateByUrl('/students/birthdays');
  }

  dismiss() {}
}
