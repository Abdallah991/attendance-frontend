import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { CANDIDATES_HEADER } from 'src/app/constants/headers';
import { TableButtonOptions, TableData } from 'src/app/interfaces/interfaces';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  constructor(private AR: ActivatedRoute) {}

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

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      this.candidates = Object.keys(response.candidates.data).map(function (_) {
        return response.candidates.data[_];
      });

      // log the response for testing
      console.log('the response is  ', this.candidates);
      // get the pages number
      // get the pages number, next page and previous
      this.numberOfPages = response.candidates['pages'];
      this.nextPage = response.candidates.next.split('=')[1];
      this.previousPage = response.candidates.previous?.split('=')[1];
      console.log(this.nextPage);
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
        id: res['id'],
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

  viewCandidate(event) {}
}
