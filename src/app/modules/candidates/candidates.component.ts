import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CANDIDATES_HEADER } from 'src/app/constants/headers';
import {
  SelectData,
  TableButtonOptions,
  TableData,
} from 'src/app/interfaces/interfaces';
import { CandidatesService } from './services/candidates.service';
import {
  FormBuilder,
  FormGroup,
  UntypedFormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private CS: CandidatesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.candidateForm = this.fb.group({
      searchInput: ['', Validators.required],
    });
  }

  candidates = [];
  // table data
  data: TableData[] = [];
  // table columns
  columns: string[] = CANDIDATES_HEADER;
  // ? pagination variables
  // number of pages
  numberOfPages: number = 1;
  // number of pages
  nextPage: number = 1;
  // number of pages
  previousPage: number = 1;
  // number of pages
  currentPage: number = 1;
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

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.candidates = Object.keys(response.candidates.data).map(function (_) {
        return response.candidates.data[_];
      });

      // get the pages number, next page and previous
      this.numberOfPages = response.candidates['pages'];
      this.nextPage = response.candidates.next.split('=')[1];
      this.previousPage = response.candidates.previous?.split('=')[1];

      // construct the table
      this.data = this.constructTableData(this.candidates);
    });
  }

  // make table data
  constructTableData(candidates: any[]): TableData[] {
    return candidates.map((res) => {
      // console.log(res);
      return {
        // the id, to return back for edit or delete events
        id: res['emp_code'],
        // the data displayed in each row
        data: [
          res['emp_code'],
          res['full_name'],
          res['department']['dept_name'],
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
        text: 'Details',
      },
      // delete button
      delete: {
        isActive: false,
        text: 'Delete',
      },
    };
  }

  // click forward implementaton
  // accepts the number of page
  async forawrdPagination($page) {
    // disable the forward button to not spam the api
    this.disableForward = true;
    this.loader = true;

    let promise = new Promise<any>(async (resolve, reject) => {
      this.CS.getCandidatesPagination($page).subscribe(
        (roles) => resolve(roles),
        (error) => reject(error)
      );
    });

    // promise if its resolved or rejected
    await promise
      .then((value) => {
        // console.log(value);
        this.candidates = Object.keys(value.data).map(function (_) {
          return value.data[_];
        });
        console.log('candidates after the pagination ', this.candidates);
        this.data = this.constructTableData(this.candidates);
        this.disableForward = false;
        this.loader = false;
      })
      .catch((err) => {
        // console log the error

        // deactivate the loader
        console.log(err);
      });
  }

  // click backward implementaton
  // accepts the number of page
  async backwardPagination($page) {
    console.log($page);
    this.disableBackward = true;
    this.loader = true;

    let promise = new Promise<any>(async (resolve, reject) => {
      this.CS.getCandidatesPagination($page).subscribe(
        (roles) => resolve(roles),
        (error) => reject(error)
      );
    });

    // promise if its resolved or rejected
    await promise
      .then((value) => {
        // console.log(value);
        this.candidates = Object.keys(value.data).map(function (_) {
          return value.data[_];
        });
        console.log('candidates after the pagination ', this.candidates);
        this.data = this.constructTableData(this.candidates);
        this.disableBackward = false;
        this.loader = false;
      })
      .catch((err) => {
        // console log the error

        // deactivate the loader
        console.log(err);
      });
  }

  viewCandidate(id) {
    this.router.navigateByUrl('/candidates/view-candidate/' + id);
  }

  // search button implementation
  search() {
    this.searchLoader = true;
    var searchValue = this.candidateForm.controls.searchInput.value;
    // TODO: put back like promise syntax
    console.log('valuefrom the form', searchValue);

    this.CS.searchCandidate(searchValue).then((result) => {
      result.subscribe((candidate) => {
        console.log(candidate);

        candidate['data'].forEach((item) => {
          this.searchValues.push({
            id: item['emp_code'],
            text: item['full_name'],
          });
        });
        this.searchLoader = false;
        this.showResults = true;
        console.log(this.searchValues);
        // TODO: display the search results from the component
      });
    });
  }

  cancelSearch() {
    this.searchLoader = false;
    this.showResults = false;
  }
}
