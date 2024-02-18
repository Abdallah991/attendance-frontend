import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  STUDENT_ADMIN_HEADER,
  STUDENT_HEADER,
} from 'src/app/constants/headers';
import {
  SelectData,
  TableButtonOptions,
  TableData,
} from 'src/app/interfaces/interfaces';
import { StudentsService } from './services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatYYYYMM, getUser } from 'src/app/constants/globalMethods';
import { AuthService } from '../auth/services/auth.service';
import { CommentService } from '../piscine/services/comment.service';
import { COHORTS, SP } from 'src/app/constants/constants';

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
    private fb: FormBuilder,
    private AS: AuthService,
    private CS: CommentService
  ) {
    var snapshot = this.AR.snapshot;
    this.spPreSet = 'all';

    var sp = snapshot.queryParamMap.get('sp')
      ? snapshot.queryParamMap.get('sp')
      : 'all';
    var cohortId = snapshot.queryParamMap.get('cohortId')
      ? snapshot.queryParamMap.get('cohortId')
      : 'all';

    this.searchForm = this.fb.group({
      searchInput: ['', Validators.required],
      // filteres
      sp: [sp, Validators.required],
      cohort: [cohortId, Validators.required],
      // applicantsGradeEnd: [gradeEnd, Validators.required],
      // applicantsSorter: [sort, Validators.required],
    });

    this.spPreSet = sp;
    this.cohortIdPreSet = cohortId;
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
  dialogTitle = 'Updating the student status ...';
  message = 'Add your notes';
  button = 'Dismiss';
  button2 = 'Confirm';
  // delete student id
  // studentId = null;
  // admin view
  adminView: boolean = false;
  // student id
  studentId = '';
  // filters
  sp: SelectData[] = SP;
  cohorts: SelectData[] = COHORTS;
  // applicantsGradeEnd: SelectData[] = GRADES_END;

  // preset value
  spPreSet;
  cohortIdPreSet;

  // get the roles and permissions
  ngOnInit(): void {
    this.AS.roles()
      .then((res) => {
        res.forEach((element) => {
          if (element.id === getUser().roleId) {
            if (element.name === 'Admin') {
              this.adminView = true;
            }
            if (element.name === 'User') {
              this.adminView = false;
            }
          }
        });

        this.getTableData();
        // console.log(this.adminView);
      })
      .catch((err) => {
        console.log(err);
        this.getTableData();
      });
  }

  // TODO: depending on admin view value
  // * data will look different for user and Admin.
  // * Admin will show all values and will have add notes button.
  // * images can be added or retrived from platform.
  // * apply pagination
  // * a big number of columns
  getTableData() {
    this.AR.data.subscribe((response: any) => {
      try {
        this.students = response?.students?.data?.students;
        console.log(this.students);
        if (this.students.length > 0) {
          this.showAddButton = false;
          if (this.adminView) {
            // add the headers
            // add the information
            // add the notes
            this.columns = STUDENT_ADMIN_HEADER;
            this.data = this.constructAdminTableData(this.students);
          } else {
            // load normal page
            this.data = this.constructTableData(this.students);
          }
        } else {
          this.showAddButton = true;
        }
      } catch (e) {
        console.log(e);
        // reload value to refresh the state of the token
        var reload = this.AR.snapshot.queryParamMap['params']['reload'];
        if (reload) {
          window.location.reload();
        }
      }
    });
  }

  // make table data
  constructTableData(students: any[]): TableData[] {
    return students.map((res) => {
      // console.log(res);
      return {
        // the id, to return back for edit or delete events
        id: res['id'],
        // the data displayed in each row
        data: [
          res['id'],
          res['firstName'] + ' ' + res['lastName'],
          // ! replace it with actual value of cohort
          res['cohortId'],
          res['phone'],
          res['platformId'],
          res['level'],
          res['progressAt'],
          res['auditDate'],
        ],
        profileImage: res['profilePicture'],
        // the action buttons
        actionButtons: this.constructTableButton(),
      };
    });
  }

  // make table data
  constructAdminTableData(students: any[]): TableData[] {
    console.log(students);
    return students.map((res) => {
      // console.log(res);
      return {
        // the id, to return back for edit or delete events
        id: res['id'],
        // the data displayed in each row
        data: [
          res['id'],
          res['firstName'] + ' ' + res['lastName'],
          // ! replace it with actual value of cohort
          res['cohortId'],
          res['phone'],
          res['platformId'],
          // new entries
          res['email'],
          res['gender'],
          formatYYYYMM(res['dob']),
          res['cpr'],
          res['nationality'],
          res['maritalStatus'],
          res['highestDegree'],
          res['academicInstitute'],
          res['graduationDate'],
          res['occupation'],
          res['currentJobTitle'],
          res['companyNameAndCR'],
          res['sp'],
          res['sponsorship'],
          res['unipal'] == 1 ? 'Yes' : 'No',
          res['discord'] == 1 ? 'Yes' : 'No',
          res['trainMe'] == 1 ? 'Yes' : 'No',
          //
          // res['level'],
          // res['progressAt'],
          // res['auditDate'],
          //
          res['notes'],
        ],
        profileImage: res['profilePicture'],
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
        isActive: this.adminView,
        text: 'Add Note',
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
          if (this.adminView) {
            this.data = this.constructAdminTableData(this.students);
          } else {
            this.data = this.constructTableData(this.students);
          }
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

  // ? add notes implementation
  addNotes($comment) {
    var data = {
      comment: $comment,
      id: this.studentId,
    };
    this.CS.updateStudentComment(data).subscribe((val) => {
      this.updateRoute();
    });
    console.log('after closing', data);
  }

  // update route
  updateRoute($updatedApplicant?) {
    this.router.navigate([], {
      queryParams: {
        sp: this.searchForm.controls.sp.value,
        cohortId: this.searchForm.controls.cohort.value,
        rand: Math.random(),
      },
    });
  }

  addNote($event) {
    console.log($event);
    this.studentId = $event;
    this.showDialog();
  }

  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  // TODO: Invoke sync attendace api
  async birthdayPage() {
    this.router.navigateByUrl('/students/birthdays');
  }

  // sync applicants and update the table
  syncStudentsData() {
    this.loader = true;
    // sync students progress with platform
    this.SS.syncStudentsProgress().subscribe((value) => {
      console.log(value);
      // sync students data with platform
      this.SS.syncStudents().subscribe((val) => {
        console.log(val);
        this.loader = false;
        // update route
        this.updateRoute();
      });
    });
  }

  imageClicked($event) {
    // console.log($event);
    this.studentId = $event;
    console.log(this.studentId);
    // add information about the dialog appearing
    this.uploadPicture();
  }

  // show uploadPicture
  async uploadPicture() {
    document.querySelector<HTMLElement>('#uploadImage')?.click();
  }

  getAddedFile = (file) => {
    console.log(file.name);

    const formData = new FormData();
    formData.append('image', file, this.studentId);
    this.CS.uploadStudentImage(formData).subscribe((data) => {
      console.log(data);
      // * lets see if we need to update route
      // this.updateRoute();
    });
    // What it does:
    // Emits the image from app-upload-file-dragdrop component
    if (file.size > 1000024) {
      // this.errorMsg = 'Image is above 1 MB limit';
    }
  };
  uploadDialogClick($event) {
    console.log('upload dialog click: ', $event);
  }

  dismiss() {}

  // filters
  spSelected($event) {
    this.searchForm.controls.sp.setValue($event);
    this.updateRoute();
  }

  cohortSelected($event) {
    this.searchForm.controls.cohort.setValue($event);
    this.updateRoute();
  }

  // reset filters
  resetFilters() {
    this.searchForm.controls.sp.setValue('all');
    this.searchForm.controls.cohort.setValue('all');
    // this.form.controls.startDate.setValue('2023-11-19');
    // this.form.controls.endDate.setValue(this.tomorrowDate);
    // this.form.controls.applicantsSorter.setValue('descending');
    // this.form.controls.applicantsStatus.setValue('all');
    this.updateRoute();
  }
}
