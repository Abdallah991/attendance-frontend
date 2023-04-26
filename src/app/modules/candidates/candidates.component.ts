import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CANDIDATES_HEADER } from 'src/app/constants/headers';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';
import { CandidatesService } from './services/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private CS: CandidatesService,
    private router: Router
  ) {}

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
  // // next Link
  // nextLink: string = '';
  // // previous Link
  // previousLink: string = '';
  disableForward = false;
  disableBackward = true;

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.candidates = Object.keys(response.candidates.data).map(function (_) {
        return response.candidates.data[_];
      });

      // log the response for testing
      // console.log('the response is  ', response.candidates);
      // next and previous links
      // this.nextLink = response.candidates.next;
      // this.previousLink = response.candidates.previous;
      // get the pages number
      // get the pages number, next page and previous
      this.numberOfPages = response.candidates['pages'];
      this.nextPage = response.candidates.next.split('=')[1];
      this.previousPage = response.candidates.previous?.split('=')[1];
      // this.nextLink = console.log(this.nextPage);
      console.log(this.previousPage);
      console.log(this.numberOfPages);
      this.data = this.constructTableData(this.candidates);
    });
  }

  // make table data
  constructTableData(candidates: any[]): TableData[] {
    return candidates.map((res) => {
      return {
        // the id, to return back for edit or delete events
        id: res['emp_code'],
        // the data displayed in each row
        data: [res['id'], res['full_name'], res['department']['dept_name']],
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
    this.router.navigateByUrl('/ candidates/view-candidate/' + id);
  }
}
