import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatYYYYDDMM } from 'src/app/constants/globalMethods';
import { USER_HEADER } from 'src/app/constants/headers';
import { TableData, TableButtonOptions } from 'src/app/interfaces/interfaces';
import { User } from 'src/app/models/User';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private US: UsersService, private AR: ActivatedRoute) {}

  // table data
  data: TableData[] = [];
  // table columns
  columns: string[] = USER_HEADER;

  ngOnInit(): void {
    var users: User[] = [];
    this.AR.data.subscribe((response: any) => {
      users = response.users;
      console.log('the value of users ', users);
      this.data = this.constructTableData(users);
    });
  }

  // make table data
  constructTableData(users: User[]): TableData[] {
    return users.map((res) => {
      return {
        // the id, to return back for edit or delete events
        id: res.id,
        // the data displayed in each row
        data: [
          res.id,
          res.name,
          formatYYYYDDMM(new Date(res.createdAt)),
          res.email,
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
        text: 'Edit',
      },
      // delete button
      delete: {
        isActive: false,
        text: 'Delete',
      },
    };
  }
}
