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
    this.candidateForm = this.fb.group({
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
  candidateForm: FormGroup;
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
      console.log('Yess this is how it works: ', this.students);
      if (this.students.length > 0) {
        this.data = this.constructTableData(this.students);
      } else {
        this.showAddButton = true;
      }
    });
  }

  // make table data
  constructTableData(candidates: any[]): TableData[] {
    return candidates.map((res) => {
      console.log(res);
      return {
        // the id, to return back for edit or delete events
        id: res['id'],
        // the data displayed in each row
        data: [
          res['id'],
          res['firstName'] + ' ' + res['lastName'],
          res['cohortId'],
          res['email'],
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
  // accepts the number of page
  async forawrdPagination($page) {
    // TODO: Implement the search
    // disable the forward button to not spam the api
    // this.disableForward = true;
    // this.loader = true;
    // let promise = new Promise<any>(async (resolve, reject) => {
    //   this.SS.getCandidatesPagination($page).subscribe(
    //     (roles) => resolve(roles),
    //     (error) => reject(error)
    //   );
    // });
    // // promise if its resolved or rejected
    // await promise
    //   .then((value) => {
    //     // console.log(value);
    //     this.students = Object.keys(value.data).map(function (_) {
    //       return value.data[_];
    //     });
    //     console.log('students after the pagination ', this.students);
    //     this.data = this.constructTableData(this.students);
    //     this.disableForward = false;
    //     this.loader = false;
    //   })
    //   .catch((err) => {
    //     // console log the error
    //     // deactivate the loader
    //     console.log(err);
    //   });
  }

  // click backward implementaton
  // accepts the number of page
  async backwardPagination($page) {
    console.log($page);
    this.disableBackward = true;
    this.loader = true;
    // TODO: check pagination later

    // let promise = new Promise<any>(async (resolve, reject) => {
    //   this.SS.getCandidatesPagination($page).subscribe(
    //     (roles) => resolve(roles),
    //     (error) => reject(error)
    //   );
    // });

    // promise if its resolved or rejected
    // await promise
    //   .then((value) => {
    //     // console.log(value);
    //     this.students = Object.keys(value.data).map(function (_) {
    //       return value.data[_];
    //     });
    //     console.log('students after the pagination ', this.students);
    //     this.data = this.constructTableData(this.students);
    //     this.disableBackward = false;
    //     this.loader = false;
    //   })
    //   .catch((err) => {
    //     // console log the error

    //     // deactivate the loader
    //     console.log(err);
    //   });
  }

  viewCandidate(id) {
    this.router.navigateByUrl('/students/view-student/' + id);
  }

  // search button implementation
  search() {
    // TODO: search functionality for the students
    this.searchLoader = true;
    this.searchValues = [];
    var searchValue = this.candidateForm.controls.searchInput.value;
    console.log('the value of the search is ', searchValue);
    if (searchValue != undefined && searchValue != '' && searchValue != null) {
      // TODO: put back like promise syntax
      // TODO: show no results when there is no results
      console.log('valuefrom the form', searchValue);
      var searchInput = {
        searchValue: searchValue,
      };
      this.SS.searchStudent(searchInput)
        .then((student) => {
          // result.subscribe((student) => {
          console.log(student);
          //   student['data'].forEach((item) => {
          //     this.searchValues.push({N
          //       id: item.platformId,
          //       text: item.firstName + ' ' + item.lastName,
          //     // });
          //   });
          //   this.searchLoader = false;
          //   this.showResults = true;
          //   console.log(this.searchValues);
          //   // TODO: display the search results from the component
          // });
        })
        .catch((err) => {
          console.log('Erro response :', err);
        });
      //   if (this.searchValues.length == 0) {2201991

      //     this.showResults = false;
      //   }
      // } else {
      //   this.searchLoader = false;
      //   this.showResults = false;
    }
  }

  cancelSearch() {
    this.searchLoader = false;
    this.showResults = false;
  }

  addStudents() {
    // TODO: add student form
    this.router.navigateByUrl('/students/add-student');
  }

  confirmDelete() {
    this.loader = true;
    this.SS.deleteStudent(this.deleteId)
      .then((res) => {
        console.log('the user deleted is ', res.data.student);
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
    console.log($event);
    this.showDialog();
  }

  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  dismiss() {}
}
